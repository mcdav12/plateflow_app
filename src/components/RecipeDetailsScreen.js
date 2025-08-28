import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

const RecipeDetailsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  
  const { recipe } = route.params || {};

  if (!recipe) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.errorText}>No recipe data found.</Text>
      </View>
    );
  }

  // Memoize the rendering of the ingredients list
  const renderedIngredients = useMemo(() => {
    return recipe.ingredients.map((ingredient, index) => (
      <Text key={index} style={styles.listItem}>- {ingredient}</Text>
    ));
  }, [recipe.ingredients]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {renderedIngredients}
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