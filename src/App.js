import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import { COLORS } from './theme/colors';

const Stack = createStackNavigator();

const MOCK_RECIPE = {
  imageUrl: 'https://picsum.photos/400/250',
  title: 'Spicy Chicken Curry',
  description: 'A delicious and easy-to-make chicken curry with a kick. Perfect for a weeknight dinner.',
  ingredients: [
    'Chicken breast, cubed (1 lb)',
    'Onion, chopped (1)',
    'Garlic, minced (2 cloves)',
    'Ginger, minced (1 tbsp)',
    'Curry powder (2 tbsp)',
    'Coconut milk (1 can)',
    'Salt and pepper to taste',
  ],
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PlateFlow' }} />
          <Stack.Screen name="RecipeDetails">
            {props => <RecipeDetailsScreen {...props} recipe={MOCK_RECIPE} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}