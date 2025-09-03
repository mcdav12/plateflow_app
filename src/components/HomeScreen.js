import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';
import { fetchRandomRecipe } from '../data/api';

// MOCK DATA: We'll use this to simulate a user's favorite list.
const MOCK_FAVORITES = [
  { id: '52824', title: 'Arrabiata' },
  { id: '52846', title: 'Lasagne' },
  { id: '52771', title: 'Spicy Arrabiata Penne' },
];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Use state to manage the favorites list (starts with mock data)
  const [favoritesList, setFavoritesList] = useState(MOCK_FAVORITES);

  // === To test the empty list scenario, change `false` to `true` ===
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState(true);

  const [isMagicMealLoading, setIsMagicMealLoading] = useState(false);

  const handleMagicMealPress = async () => {
    // Logic: Check if the favorites list is empty
    if (favoritesList.length === 0) {
      // If empty, navigate to the Add screen to prompt the user
      navigation.navigate('Add');
    } else {
      // If not empty, pick a random favorite
      setIsMagicMealLoading(true);
      const randomIndex = Math.floor(Math.random() * favoritesList.length);
      const randomMealId = favoritesList[randomIndex].id;
      
      // Since our API only has a function for random meals, we'll simulate the navigation
      // In a real app, we would fetch the details for the specific randomMealId
      const newRecipe = await fetchRandomRecipe(); 
      setIsMagicMealLoading(false);

      if (newRecipe) {
        navigation.navigate('RecipeDetails', { recipe: newRecipe });
      }
    }
  };

  const handleAddFavoritesPrompt = () => {
    navigation.navigate('Add');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* If the favorites list is empty, show the prompt */}
      {isFavoritesEmpty && (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Your favorites list is empty!</Text>
          <Pressable style={styles.promptButton} onPress={handleAddFavoritesPrompt}>
            <Text style={styles.promptButtonText}>Add a favorite now</Text>
          </Pressable>
        </View>
      )}

      {/* The main button. It will now be hidden if the prompt is showing */}
      {!isFavoritesEmpty && (
        <Pressable
          style={({ pressed }) => [styles.magicMealButton, pressed && GlobalStyles.buttonPressed]}
          onPress={handleMagicMealPress}
          disabled={isMagicMealLoading}
        >
          <Ionicons name="sparkles" size={60} color={COLORS.white} />
          <Text style={styles.buttonText}>Magic Meal</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  magicMealButton: {
    backgroundColor: COLORS.primary,
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
    marginTop: 10,
  },
  promptContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promptText: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 15,
  },
  promptButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
  },
  promptButtonText: {
    color: COLORS.white,
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
});

export default HomeScreen;