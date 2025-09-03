import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { View, StyleSheet, Pressable } from 'react-native';

import HomeScreen from '../components/HomeScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import AddRecipeScreen from '../components/AddRecipeScreen';
import ProfileScreen from '../components/ProfileScreen';
import SearchScreen from '../components/SearchScreen';

const Tab = createBottomTabNavigator();

// Custom component for the larger '+' button
const AddTabButton = ({ children, onPress }) => (
  <Pressable style={styles.addTabButton} onPress={onPress}>
    <View style={styles.addTabButtonInner}>
      {children}
    </View>
  </Pressable>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightText,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Browse') {
            iconName = 'search';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Add') {
            iconName = 'add';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Browse" component={SearchScreen} />
      <Tab.Screen
        name="Add"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={30} color={COLORS.white} />
          ),
          tabBarButton: (props) => (
            <AddTabButton {...props} />
          ),
          tabBarLabel: 'Add',
        }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addTabButton: {
    // This will horizontally center the button
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTabButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;