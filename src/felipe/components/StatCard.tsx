import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import Card from './Card';

type Props = { value: string | number; label: string; accent?: string };

export default function StatCard({ value, label, accent }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={[styles.value, accent ? { color: accent } : null]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 72 },
  value: { color: colors.text, fontSize: 22, fontWeight: '700' },
  label: { color: colors.muted, fontSize: 11, marginTop: 3 },
});
