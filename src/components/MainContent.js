import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../theme/styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const MainContent = ({
  searchPlaceholder,
  searchQuery,
  setSearchQuery,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleCancel = () => {
    setIsFocused(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {isFocused && (
          <Pressable style={styles.iconButton} onPress={handleCancel}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </Pressable>
        )}
        <Ionicons name="search" size={20} color={COLORS.lightText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor={COLORS.lightText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
        />
        {searchQuery.length > 0 && (
          <Pressable style={styles.iconButton} onPress={handleClear}>
            <Ionicons name="close-circle" size={24} color={COLORS.lightText} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  iconButton: {
    marginLeft: 5,
  },
});

export default MainContent;