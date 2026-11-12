import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import { ChatMessage } from '../data/mock';

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const mine = message.from === 'aluno';
  return (
    <View style={[styles.wrap, mine ? styles.wrapMine : styles.wrapOther]}>
      <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
      <Text style={[styles.time, mine && styles.timeMine]}>{message.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: '78%', marginBottom: 12 },
  wrapOther: { alignSelf: 'flex-start' },
  wrapMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubble: { borderRadius: 16, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 14 },
  bubbleOther: { backgroundColor: colors.surface, borderColor: colors.border },
  bubbleMine: { backgroundColor: colors.orangeSoft, borderColor: '#8A5539' },
  text: { color: colors.text, fontSize: 13, lineHeight: 18 },
  time: { color: '#6F747C', fontSize: 10, marginTop: 4 },
  timeMine: { textAlign: 'right' },
});
