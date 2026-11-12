import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import Card from './Card';

export default function StatCard({ value, label, accent }) {
  return (
    <Card style={styles.card}>
      <Text style={[styles.value, accent ? { color: accent } : null]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 64 },
  value: { color: colors.text, fontSize: 21, fontWeight: '700' },
  label: { color: colors.muted, fontSize: 10, marginTop: 3 },
});
