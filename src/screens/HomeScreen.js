import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { COLORS } from '../theme/colors';

// Mock data for testing
const MOCK_FAVORITE_MEALS = [];
//  { id: '1', name: 'Spaghetti Bolognese', image: 'url' },
//  { id: '2', name: 'Chicken Curry', image: 'url' },
//  { id: '3', name: 'Vegetable Stir-fry', image: 'url' },

const HomeScreen = ({ navigation }) => {
  const onMagicMealPress = () => {
    if (MOCK_FAVORITE_MEALS.length === 0) {
      navigation.navigate('MagicMealResult', { favoritesEmpty: true });
    } else {
      const randomIndex = Math.floor(Math.random() * MOCK_FAVORITE_MEALS.length);
      const meal = MOCK_FAVORITE_MEALS[randomIndex];
      navigation.navigate('MagicMealResult', { selectedMeal: meal });
    }
  };

  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.magicButtonContainer}
          onPress={onMagicMealPress}
          activeOpacity={0.8}
        >
          <View style={styles.magicButton}>
            <Text category='h1' style={styles.magicButtonText}>
              MAGIC MEAL
            </Text>
            <Text category='p1' style={styles.magicButtonSubText}>
              Tap for a surprise!
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  magicButtonContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  magicButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  magicButtonText: {
    color: COLORS.white,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  magicButtonSubText: {
    color: COLORS.white,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;