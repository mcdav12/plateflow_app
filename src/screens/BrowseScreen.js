import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Browse Screen - Categories Go Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BrowseScreen;