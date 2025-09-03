import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const tabs = [
  { name: 'Top Picks', icon: 'star-outline' },
  { name: 'Categories', icon: 'grid-outline' },
  { name: 'Filters', icon: 'filter-outline' },
];

const BrowseContent = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          style={[styles.tabButton, activeTab === tab.name && styles.activeTab]}
          onPress={() => onTabChange(tab.name)}
        >
          <Ionicons
            name={tab.icon}
            size={20}
            color={activeTab === tab.name ? COLORS.white : COLORS.primary}
          />
          <Text style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}>
            {tab.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 5,
  },
  activeTabText: {
    color: COLORS.white,
  },
});

export default BrowseContent;