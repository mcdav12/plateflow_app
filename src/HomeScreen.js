import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import { GlobalStyles } from './theme/styles';

const HomeScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      {/* Main Content fills the entire space first */}
      <View style={styles.mainContent}>
        <MainContent 
          buttonText="Magic Meal" 
          searchPlaceholder="What do you have on hand?"
        />
      </View>
      
      {/* Header and Footer are placed on top using absolute positioning */}
      <Header title="PlateFlow" />
      <Footer 
        homeText="Home" 
        favoritesText="Favorites" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1, // This view takes up all available space
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;