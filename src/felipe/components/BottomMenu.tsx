import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export type StudentTab = 'Início' | 'Treino' | 'Histórico' | 'Progresso' | 'Mensagens' | 'Perfil';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const studentItems: [StudentTab, string][] = [
  ['Início', 'home'],
  ['Treino', 'barbell'],
  ['Histórico', 'time'],
  ['Progresso', 'stats-chart'],
  ['Mensagens', 'chatbubble'],
  ['Perfil', 'person'],
];

type Props = {
  active: StudentTab;
  onSelect?: (tab: StudentTab) => void;
};

export default function BottomMenu({ active, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {studentItems.map(([label, icon]) => {
        const selected = label === active;
        return (
          <Pressable
            key={label}
            style={styles.item}
            onPress={() => onSelect?.(label)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <View style={[styles.iconBox, selected && styles.iconActive]}>
              <Ionicons
                name={(selected ? icon : `${icon}-outline`) as IconName}
                size={18}
                color={selected ? colors.background : colors.tabLabel}
              />
            </View>
            <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    backgroundColor: '#17191D',
    borderTopWidth: 1,
    borderTopColor: '#292D33',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 6,
    paddingBottom: 5,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconBox: {
    width: 28,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.tabIcon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: { backgroundColor: colors.orange },
  label: { color: colors.tabLabel, fontSize: 9, marginTop: 4 },
  labelActive: { color: colors.text },
});
