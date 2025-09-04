import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to PlateFlow</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('MainTabs')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default OnboardingScreen;