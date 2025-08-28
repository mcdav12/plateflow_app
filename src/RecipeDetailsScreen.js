import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from './theme/styles';
import RecipeHeader from './components/RecipeHeader';
import IngredientsList from './components/IngredientsList';
import { COLORS } from './theme/colors';

const RecipeDetailsScreen = ({ recipe }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        style={styles.image}
        source={{ uri: recipe.imageUrl }}
      />
      <View style={styles.content}>
        <RecipeHeader
          title={recipe.title}
          description={recipe.description}
        />
        <IngredientsList
          ingredients={recipe.ingredients}
        />
      </View>
    </ScrollView>
  );
};

RecipeDetailsScreen.propTypes = {
  recipe: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 40, // Adds space at the bottom for scrolling
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
});

export default RecipeDetailsScreen;