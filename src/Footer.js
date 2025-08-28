import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from './theme/colors';

const Footer = ({ homeText, favoritesText }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>{homeText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>{favoritesText}</Text>
      </TouchableOpacity>
    </View>
  );
};

Footer.propTypes = {
  homeText: PropTypes.string.isRequired,
  favoritesText: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBackground,
  },
  footerButton: {
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.lightText,
  },
});

export default Footer;