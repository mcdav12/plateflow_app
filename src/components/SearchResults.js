import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

const SearchResults = ({ recipes, searchQuery }) => {
  const navigation = useNavigation();

  const handleRecipePress = (recipe) => {
    // Navigate to the RecipeDetails screen with the selected recipe's data
    navigation.navigate('RecipeDetails', { recipe });
  };

  if (!searchQuery && recipes.length === 5) {
    return null; // Don't show results until the user starts typing
  }

  if (recipes.length === 0 && searchQuery) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResultsText}>No recipes found for "{searchQuery}".</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultsCountText}>Found {recipes.length} recipes.</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

SearchResults.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  resultsCountText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.lightText,
    textAlign: 'center',
    marginTop: 20,
  },
  recipeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recipeTitle: {
    fontSize: 18,
    color: COLORS.text,
  },
});

export default SearchResults;