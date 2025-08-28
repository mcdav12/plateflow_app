import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../theme/colors';

const MainContent = ({ buttonText, searchPlaceholder, onButtonPress, searchQuery, setSearchQuery, onSubmitSearch }) => {
  return (
    <View style={styles.mainContent}>
      <TouchableOpacity 
        style={styles.magicMealButton} 
        onPress={onButtonPress} 
      >
        <Text style={styles.magicMealText}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          style={styles.searchBar}
          placeholder={searchPlaceholder}
          placeholderTextColor={COLORS.lightText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSubmitSearch} // New prop for Enter key
        />
      </View>
    </View>
  );
};

MainContent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  magicMealButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  magicMealText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: COLORS.lightText,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});

export default MainContent;