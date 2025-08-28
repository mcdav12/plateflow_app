import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/components/HomeScreen';
import FavoritesScreen from './src/components/FavoritesScreen';
import RecipeDetailsScreen from './src/components/RecipeDetailsScreen';
import { COLORS } from './src/theme/colors';

// Create a Tab Navigator
const Tab = createBottomTabNavigator();
// Create a Stack Navigator
const Stack = createStackNavigator();

// This component defines the tab bar at the bottom
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.white },
            headerTintColor: COLORS.text,
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Tabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}