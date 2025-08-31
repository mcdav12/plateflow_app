import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles'; // Import GlobalStyles
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const FAVORITES_KEY = '@my-favorites';

const RecipeDetailsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  
  const { recipe } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          const favoritesArray = JSON.parse(storedFavorites);
          const isFavorited = favoritesArray.some(favRecipe => favRecipe.id === recipe.id);
          setIsFavorite(isFavorited);
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    if (recipe) {
      checkFavoriteStatus();
    }
  }, [recipe]);

  if (!recipe || !recipe.ingredients) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.errorText}>No recipe data found or incomplete recipe.</Text>
      </View>
    );
  }

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      let newIsFavoriteStatus = false;

      if (isFavorite) {
        favoritesArray = favoritesArray.filter(favRecipe => favRecipe.id !== recipe.id);
      } else {
        favoritesArray.push(recipe);
        newIsFavoriteStatus = true;
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
      setIsFavorite(newIsFavoriteStatus);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const renderIngredient = ({ item, index }) => (
    <Text key={index} style={styles.listItem}>- {item}</Text>
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.imageUrl || DEFAULT_IMAGE }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Pressable onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={32}
              color={isFavorite ? 'red' : 'black'}
            />
          </Pressable>
        </View>
        <Text style={[styles.description, GlobalStyles.text]}>{recipe.description}</Text>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <FlatList
          data={recipe.ingredients}
          renderItem={renderIngredient}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lato_700Bold', // Apply the bold font here
    color: COLORS.text,
    flexShrink: 1,
  },
  description: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 20,
    fontFamily: 'Lato_400Regular', // Apply the regular font here
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Lato_700Bold', // Apply the bold font here
    color: COLORS.text,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
    fontFamily: 'Lato_400Regular', // Apply the regular font here
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Lato_400Regular', // Apply the regular font here
  },
});

export default RecipeDetailsScreen;