import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../theme/colors';

const RecipeHeader = ({ title, description }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

RecipeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
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
});

export default RecipeHeader;