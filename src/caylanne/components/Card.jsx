import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    // borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: 14,
  },
});
