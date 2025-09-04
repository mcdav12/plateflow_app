import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { COLORS } from '../theme/colors';

const MagicMealResultScreen = ({ navigation, route }) => {
  const { selectedMeal, favoritesEmpty } = route.params;

  const onRollAgainPress = () => {
    // Navigate back to Discover, which will reset the state
    navigation.goBack();
  };

  const onCookThisPress = () => {
    // Logic to view the recipe details (to be implemented later)
    alert(`You've chosen to cook: ${selectedMeal.name}`);
  };

  const navigateToBrowse = () => {
    // Navigate to the 'MainTabs' navigator and then specify 'Browse' as the screen
    navigation.navigate('MainTabs', { screen: 'Browse' });
  };

  const navigateToAdd = () => {
    // Navigate to the 'MainTabs' navigator and then specify 'Add' as the screen
    navigation.navigate('MainTabs', { screen: 'Add' });
  };

  const renderContent = () => {
    if (favoritesEmpty) {
      return (
        <View style={styles.emptyContainer}>
          <Text category='h5' style={styles.emptyText}>
            Your favorites list is empty!
          </Text>
          <Text style={styles.emptySubText}>
            Add a few meals to get a magic surprise.
          </Text>
          <Button style={styles.emptyButton} onPress={navigateToAdd}>
            ADD A FAVORITE
          </Button>
          <Button style={styles.emptyButton} onPress={navigateToBrowse} appearance='ghost'>
            BROWSE RECIPES
          </Button>
        </View>
      );
    }

    // A meal was successfully selected
    if (selectedMeal) {
      return (
        <View style={styles.mealContainer}>
          <Text category='h5' style={styles.mealText}>Your Magic Meal is:</Text>
          <Text category='h3' style={styles.mealName}>{selectedMeal.name}</Text>
          {/* We'll add a snippet of the meal UI here later, e.g., an image */}
          <View style={styles.mealButtons}>
            <Button style={styles.mealButton} onPress={onCookThisPress}>
              COOK THIS
            </Button>
            <Button style={styles.mealButton} onPress={onRollAgainPress} appearance='ghost'>
              ROLL AGAIN
            </Button>
          </View>
        </View>
      );
    }
  };

  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {renderContent()}
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubText: {
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.gray,
  },
  emptyButton: {
    width: '100%',
    marginVertical: 5,
  },
  mealContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mealText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  mealName: {
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.primary,
  },
  mealButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  mealButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default MagicMealResultScreen;