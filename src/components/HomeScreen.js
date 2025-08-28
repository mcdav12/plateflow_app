import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MainContent from './MainContent';
import SearchResults from './SearchResults';
import { GlobalStyles } from '../theme/styles';
import { fetchRandomRecipe } from '../data/api';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial recipe on component load
  useEffect(() => {
    const loadRecipes = async () => {
      const initialRecipes = [];
      // Fetch 5 random recipes
      for (let i = 0; i < 5; i++) {
        const recipe = await fetchRandomRecipe();
        if (recipe) {
          initialRecipes.push(recipe);
        }
      }
      setRecipes(initialRecipes);
      setFilteredRecipes(initialRecipes);
      setIsLoading(false);
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = recipes.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return titleMatch || ingredientsMatch;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  const handleMagicMealPress = async () => {
    // Fetch a new random recipe for the button press
    setIsLoading(true);
    const newRecipe = await fetchRandomRecipe();
    setIsLoading(false);
    if (newRecipe) {
      navigation.navigate('RecipeDetails', { recipe: newRecipe });
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <MainContent
              buttonText="Magic Meal"
              searchPlaceholder="What do you have on hand?"
              onButtonPress={handleMagicMealPress}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmitSearch={handleSearchSubmit}
            />
            <SearchResults recipes={filteredRecipes} searchQuery={searchQuery} />
          </>
        )}
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