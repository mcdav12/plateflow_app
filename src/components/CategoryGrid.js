import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Pasta', icon: 'restaurant-outline' },
  { name: 'Dessert', icon: 'ice-cream-outline' },
  { name: 'Breakfast', icon: 'cafe-outline' },
  { name: 'Seafood', icon: 'fish-outline' },
  { name: 'Vegetarian', icon: 'leaf-outline' },
  { name: 'Mexican', icon: 'pizza-outline' },
  { name: 'Italian', icon: 'nutrition-outline' },
  { name: 'Soups', icon: 'egg-outline' },
];

const CategoryGrid = () => {
  const renderItem = ({ item }) => (
    <Pressable style={styles.card}>
      <View style={styles.cardInner}>
        <Ionicons name={item.icon} size={40} color={COLORS.primary} />
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: COLORS.text,
  },
});

export default CategoryGrid;