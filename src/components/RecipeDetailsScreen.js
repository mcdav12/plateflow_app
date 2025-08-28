import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const RecipeDetailsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  
  const { recipe } = route.params || {};

  if (!recipe || !recipe.ingredients) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.errorText}>No recipe data found or incomplete recipe.</Text>
      </View>
    );
  }

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
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  description: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default RecipeDetailsScreen;