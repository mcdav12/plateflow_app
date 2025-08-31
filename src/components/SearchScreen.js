import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainContent from './MainContent';
import SearchResults from './SearchResults';
import { GlobalStyles } from '../theme/styles';
import { searchRecipeByName } from '../data/api';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setIsLoadingResults(true);
        const searchResults = await searchRecipeByName(searchQuery);
        setRecipes(searchResults);
        setIsLoadingResults(false);
      } else {
        setRecipes([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.mainContent}>
        <MainContent
          searchPlaceholder="What meal are you looking for?"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <SearchResults recipes={recipes} searchQuery={searchQuery} isLoading={isLoadingResults} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;