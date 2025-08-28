import React from 'react';
import { SafeAreaView } from 'react-native';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import { COLORS } from './theme/colors';

const MOCK_RECIPE = {
  imageUrl: 'https://picsum.photos/400/250',
  title: 'Spicy Chicken Curry',
  description: 'A delicious and easy-to-make chicken curry with a kick. Perfect for a weeknight dinner. This is an extra-long description to add more content and ensure that the text on the screen is long enough to make the screen scrollable. This is an extra-long description to add more content and ensure that the text on the screen is long enough to make the screen scrollable.',
  ingredients: [
    'Chicken breast, cubed (1 lb)',
    'Onion, chopped (1)',
    'Garlic, minced (2 cloves)',
    'Ginger, minced (1 tbsp)',
    'Curry powder (2 tbsp)',
    'Coconut milk (1 can)',
    'Salt and pepper to taste',
    'Bell pepper, sliced (1)',
    'Tomato sauce (8 oz)',
    'Cilantro, chopped (1/4 cup)',
    'Jalapeño, sliced (1)',
    'Lime juice (1 tbsp)',
    'Cumin (1 tsp)',
    'Turmeric (1/2 tsp)',
    'Cayenne pepper (1/4 tsp)',
    'Cinnamon stick (1)',
    'Bay leaf (1)',
    'Potatoes, diced (2)',
    'Carrots, chopped (1)',
    'Green beans (1 cup)',
    'Spinach (1 cup)',
    'Sugar (1 tsp)',
    'Chicken broth (1/2 cup)',
    'Garam masala (1 tsp)',
    'Cardamom pods (2)',
    'Cloves (3)',
    'Star anise (1)',
  ],
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <RecipeDetailsScreen recipe={MOCK_RECIPE} />
    </SafeAreaView>
  );
}