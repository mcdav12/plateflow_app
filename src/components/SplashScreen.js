import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PlateFlow</Text>
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  spinner: {
    marginTop: 20,
  },
});

export default SplashScreen;