import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import { GlobalStyles } from './theme/styles';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleMagicMealPress = () => {
    navigation.navigate('RecipeDetails');
  };

  return (
    <View style={[GlobalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.mainContent}>
        <MainContent 
          buttonText="Magic Meal" 
          searchPlaceholder="What do you have on hand?"
          onButtonPress={handleMagicMealPress}
        />
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;