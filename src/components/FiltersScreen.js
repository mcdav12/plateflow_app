import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const FiltersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Filters screen. We'll build it later!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: COLORS.text,
  },
});

export default FiltersScreen;