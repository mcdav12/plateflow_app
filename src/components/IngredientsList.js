import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../theme/colors';

const IngredientsList = ({ ingredients }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {ingredients.map((item, index) => (
        <Text key={index} style={styles.text}>
          - {item}
        </Text>
      ))}
    </View>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: COLORS.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
  },
});

export default IngredientsList;