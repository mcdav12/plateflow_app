import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../theme/colors';
import RecipeCard from './RecipeCard'; // Import the new component

const SearchResults = ({ recipes, searchQuery }) => {
  if (searchQuery.length > 0 && recipes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResultsText}>No recipes found. Try a different search!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.lightText,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default SearchResults;