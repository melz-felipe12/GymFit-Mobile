import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import Card from './Card';
import { DayFrequency } from '../data/mock';

type Props = { days: DayFrequency[] };

export default function WeekFrequency({ days }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        {days.map((item, index) => (
          <View
            key={`${item.full}-${index}`}
            style={styles.column}
            accessibilityLabel={`${item.full}: ${item.done ? 'treinou' : 'sem treino'}`}
          >
            <View style={[styles.bar, item.done ? styles.barDone : styles.barEmpty]}>
              {item.done ? <Ionicons name="checkmark" size={14} color={colors.onOrange} /> : null}
            </View>
            <Text style={styles.day}>{item.short}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: 16, paddingHorizontal: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  column: { alignItems: 'center', flex: 1 },
  bar: { width: 22, borderRadius: 7, marginBottom: 6, alignItems: 'center', justifyContent: 'center' },
  barDone: { height: 44, backgroundColor: colors.orange },
  barEmpty: { height: 7, backgroundColor: colors.tabIcon, borderWidth: 1, borderColor: '#343A42' },
  day: { color: '#858A92', fontSize: 10 },
});
