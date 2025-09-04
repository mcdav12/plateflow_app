import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const handleIngredientChange = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleInstructionChange = (text, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  // NEW: Function to save the recipe
  const saveRecipe = async () => {
    // Basic validation to ensure key fields are filled
    if (!recipeName || ingredients.every(i => i.trim() === '') || instructions.every(i => i.trim() === '')) {
      Alert.alert('Error', 'Please fill in the recipe title, ingredients, and at least one instruction.');
      return;
    }

    const newRecipe = {
      id: Date.now().toString(), // Use a unique ID based on a timestamp
      title: recipeName,
      description: description,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      isUserAdded: true, // A flag to distinguish user-added recipes
    };

    try {
      // Fetch existing recipes, or an empty array if none exist
      const existingRecipesJson = await AsyncStorage.getItem('recipes');
      const existingRecipes = existingRecipesJson ? JSON.parse(existingRecipesJson) : [];

      // Add the new recipe to the list
      const updatedRecipes = [newRecipe, ...existingRecipes];

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      
      Alert.alert('Success', `${recipeName} has been saved!`);
      
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save the recipe. Please try again.');
    }
  };

  return (
    <View style={[GlobalStyles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Add New Recipe</Text>
        </View>

        {/* Recipe Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Recipe Title"
            placeholderTextColor={COLORS.lightText}
            value={recipeName}
            onChangeText={setRecipeName}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief description"
            placeholderTextColor={COLORS.lightText}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`e.g. 1 cup flour`}
              placeholderTextColor={COLORS.lightText}
              value={ingredient}
              onChangeText={(text) => handleIngredientChange(text, index)}
            />
          ))}
          <Pressable style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </Pressable>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructions.map((instruction, index) => (
            <TextInput
              key={index}
              style={[styles.input, styles.textArea]}
              placeholder={`Step ${index + 1}: ...`}
              placeholderTextColor={COLORS.lightText}
              multiline
              value={instruction}
              onChangeText={(text) => handleInstructionChange(text, index)}
            />
          ))}
          <Pressable style={styles.addButton} onPress={addInstruction}>
            <Text style={styles.addButtonText}>Add Step</Text>
          </Pressable>
        </View>
        
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <Button title="Save Recipe" color={COLORS.primary} onPress={saveRecipe} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
    color: COLORS.text,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: COLORS.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButtonText: {
    fontFamily: 'Lato_700Bold',
    color: COLORS.primary,
    fontSize: 16,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default AddRecipeScreen;