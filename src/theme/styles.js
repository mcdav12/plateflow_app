import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  sectionContainer: {
    padding: 20,
  },
});

export const ButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
});