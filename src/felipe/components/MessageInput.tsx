import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Platform, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

type Props = { value: string; onChangeText: (t: string) => void; onSend: () => void };

export default function MessageInput({ value, onChangeText, onSend }: Props) {
  const canSend = value.trim().length > 0;
  return (
    <View style={styles.bar}>
      <TextInput
        style={[styles.input, webNoOutline]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Escreva uma mensagem..."
        placeholderTextColor="#6F747C"
        returnKeyType="send"
        onSubmitEditing={onSend}
      />
      <Pressable
        style={[styles.send, !canSend && styles.sendDisabled]}
        onPress={onSend}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel="Enviar mensagem"
      >
        <Ionicons name="send" size={16} color={colors.onOrange} />
      </Pressable>
    </View>
  );
}

// Propriedade apenas da web: remove o contorno padrão do navegador ao focar.
const webNoOutline = Platform.select<TextStyle>({
  web: { outlineStyle: 'none' } as unknown as TextStyle,
  default: {},
});

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 13,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.45 },
});
