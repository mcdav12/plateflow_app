import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const RecipeCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image
        source={{ uri: item.imageUrl || DEFAULT_IMAGE }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={[styles.recipeSnippet, GlobalStyles.text]}>A delightful dish with savory spices and a hint of fresh herbs.</Text>
        <Text style={styles.duration}>
          <Text style={[styles.durationLabel, GlobalStyles.text]}>Duration: </Text>
          <Text style={[styles.durationValue, GlobalStyles.text]}>25 mins</Text>
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.lightText} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato_700Bold',
    color: COLORS.text,
  },
  recipeSnippet: {
    fontSize: 14,
    color: COLORS.lightText,
    marginTop: 5,
    fontFamily: 'Lato_400Regular',
  },
  duration: {
    marginTop: 5,
  },
  durationLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: 'Lato_400Regular',
  },
  durationValue: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: 'Lato_700Bold',
  },
});

export default RecipeCard;