import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

type Props = { title: string; action?: string; onActionPress?: () => void };

export default function SectionTitle({ title, action, onActionPress }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? (
        <Text onPress={onActionPress} style={styles.action}>
          {action}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { color: colors.muted, fontSize: 12 },
  action: { color: colors.orange, fontSize: 12 },
});
