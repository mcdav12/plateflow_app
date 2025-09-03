import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainContent from './MainContent';
import SearchResults from './SearchResults';
import BrowseContent from './BrowseContent';
import CategoryGrid from './CategoryGrid';
import FiltersScreen from './FiltersScreen';
import { GlobalStyles } from '../theme/styles';
import { searchRecipeByName, fetchRecipeByCategory } from '../data/api';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeTab, setActiveTab] = useState('Top Picks');
  const inputRef = useRef(null); // <-- We're now creating the ref here

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setIsLoadingResults(true);
        const searchResults = await searchRecipeByName(searchQuery);
        setRecipes(searchResults);
        setIsLoadingResults(false);
      } else {
        handleTabChange(activeTab);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, activeTab]);

  const handleTabChange = async (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Top Picks') {
      setIsLoadingResults(true);
      const topPicks = await fetchRecipeByCategory('Dessert');
      setRecipes(topPicks);
      setIsLoadingResults(false);
    } else if (tabName === 'Categories') {
      setRecipes([]);
    } else if (tabName === 'Filters') {
      setRecipes([]);
    }
  };

  const handleSearchSubmit = (query) => {
    const isNew = recentSearches.every(item => item.toLowerCase() !== query.toLowerCase());
    if (isNew) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const handleBackAction = () => {
    setSearchQuery('');
    // Now this will correctly blur the input because the ref is passed down
    if (inputRef.current) {
        inputRef.current.blur();
    }
  };

  const renderContent = () => {
    if (searchQuery.length > 0) {
      return <SearchResults recipes={recipes} isLoading={isLoadingResults} />;
    } else {
      switch (activeTab) {
        case 'Top Picks':
          return <SearchResults recipes={recipes} isLoading={isLoadingResults} />;
        case 'Categories':
          return <CategoryGrid />;
        case 'Filters':
          return <FiltersScreen />;
        default:
          return null;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.mainContent}>
        <MainContent
          ref={inputRef} // <-- We're now passing the ref to the child component
          searchPlaceholder="What meal are you looking for?"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          recentSearches={recentSearches}
          onSubmitSearch={handleSearchSubmit}
          onBack={handleBackAction}
        />
        {searchQuery.length === 0 && (
          <BrowseContent
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
        {renderContent()}
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