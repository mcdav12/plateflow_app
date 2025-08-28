import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import { COLORS } from './theme/colors';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HomeScreen />
    </SafeAreaView>
  );
}