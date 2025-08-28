import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const UserIcon = () => {
  return (
    <TouchableOpacity style={styles.userIcon}>
      <Text style={styles.iconText}>👤</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    padding: 8,
  },
  iconText: {
    fontSize: 24,
  },
});

export default UserIcon;