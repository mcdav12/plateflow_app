import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MainContent from './MainContent';
import SearchResults from './SearchResults';
import { GlobalStyles } from '../theme/styles';
import { RECIPES } from '../data/recipes';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(RECIPES);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = RECIPES.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return titleMatch || ingredientsMatch;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(RECIPES);
    }
  }, [searchQuery]);

  const handleMagicMealPress = () => {
    if (filteredRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
      const randomRecipe = filteredRecipes[randomIndex];
      navigation.navigate('RecipeDetails', { recipe: randomRecipe });
    } else {
      // Optional: Add a message to the user if no recipes are found
      console.log('No recipes to choose from!');
    }
  };
  
  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchQuery);
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.mainContent}>
        <MainContent 
          buttonText="Magic Meal" 
          searchPlaceholder="What do you have on hand?"
          onButtonPress={handleMagicMealPress}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmitSearch={handleSearchSubmit}
        />
        <SearchResults recipes={filteredRecipes} searchQuery={searchQuery} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;