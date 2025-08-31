import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen 
        name="RecipeDetails" 
        component={RecipeDetailsScreen} 
        options={{ 
          headerShown: true,
          title: 'Recipe Details', // You can add a dynamic title later
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;