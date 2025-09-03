import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';

const MainContent = React.forwardRef(({
  searchPlaceholder,
  searchQuery,
  setSearchQuery,
  recentSearches,
  onSubmitSearch,
  onBack,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchSubmit = () => {
    if (searchQuery.length > 0) {
      onSubmitSearch(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {isFocused && (
          <Pressable style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </Pressable>
        )}
        {!isFocused && <Ionicons name="search" size={20} color={COLORS.lightText} style={styles.searchIcon} />}
        <TextInput
          ref={ref} // <-- We're now correctly passing the ref here
          style={styles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor={COLORS.lightText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable style={styles.clearButton} onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.lightText} />
          </Pressable>
        )}
      </View>
      {isFocused && searchQuery.length === 0 && recentSearches.length > 0 && (
        <View style={GlobalStyles.card}>
          {recentSearches.map((search, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.recentSearchItem,
                pressed && GlobalStyles.buttonPressed,
              ]}
              onPress={() => {
                setSearchQuery(search);
                handleSearchSubmit();
              }}
            >
              <Text style={styles.recentSearchText}>{search}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  backButton: {
    marginRight: 5,
  },
  clearButton: {
    padding: 5,
  },
  recentSearchItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  recentSearchText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: COLORS.text,
  },
});

export default MainContent;