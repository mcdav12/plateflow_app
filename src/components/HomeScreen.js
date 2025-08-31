import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';
import { fetchRandomRecipe } from '../data/api';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isMagicMealLoading, setIsMagicMealLoading] = useState(false);

  const handleMagicMealPress = async () => {
    setIsMagicMealLoading(true);
    const newRecipe = await fetchRandomRecipe();
    setIsMagicMealLoading(false);
    
    if (newRecipe) {
      navigation.navigate('RecipeDetails', { recipe: newRecipe });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Pressable
        style={({ pressed }) => [styles.magicMealButton, pressed && GlobalStyles.buttonPressed]}
        onPress={handleMagicMealPress}
        disabled={isMagicMealLoading}
      >
        <Ionicons name="sparkles" size={48} color={COLORS.white} />
        <Text style={styles.buttonText}>Magic Meal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  magicMealButton: {
    backgroundColor: COLORS.primary,
    width: 150,
    height: 150,
    borderRadius: 75,
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
    fontSize: 16,
    marginTop: 10,
  },
});

export default HomeScreen;