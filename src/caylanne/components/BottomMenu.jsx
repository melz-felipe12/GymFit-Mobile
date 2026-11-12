import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const studentItems = [
  ['Início', 'home'], ['Treino', 'barbell'], ['Histórico', 'time'],
  ['Progresso', 'stats-chart'], ['Mensagens', 'chatbubble'], ['Perfil', 'person'],
];
const instructorItems = [
  ['Início', 'home'], ['Alunos', 'people'], ['Treinos', 'barbell'],
  ['Mensagens', 'chatbubble'], ['Perfil', 'person'],
];

export default function BottomMenu({ role = 'aluno', active = 'Início', onRoleSwitch, onSelect }) {
  const items = role === 'aluno' ? studentItems : instructorItems;
  return (
    <View style={styles.container}>
      {items.map(([label, icon]) => {
        const selected = label === active;
        return (
          <Pressable
            key={label}
            style={styles.item}
            onPress={onSelect ? () => onSelect(label) : label === 'Perfil' ? onRoleSwitch : undefined}
          >
            <View style={[styles.iconBox, selected && styles.iconActive]}>
              <Ionicons
                name={selected ? icon : `${icon}-outline`}
                size={18}
                color={selected ? colors.background : '#292E35'}
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
    width: 18, height: 18, borderRadius: 6,
    backgroundColor: '#292E35', alignItems: 'center', justifyContent: 'center',
  },
  iconActive: { backgroundColor: colors.orange },
  label: { color: '#777D86', fontSize: 9, marginTop: 4 },
  labelActive: { color: colors.text },
});
