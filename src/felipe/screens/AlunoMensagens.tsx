import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, ScrollViewInstance, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomMenu, { StudentTab } from '../components/BottomMenu';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import PhoneFrame from '../components/PhoneFrame';
import { RootStackParamList } from '../../navigation/types';
import { goToAlunoTab } from '../../navigation/alunoTabs';
import { ChatMessage, initialMessages, instructorName } from '../data/mock';
import { colors } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AlunoMensagens'>;

function nowLabel() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `Hoje, ${hh}:${mm}`;
}

export default function AlunoMensagens({ navigation }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const listRef = useRef<ScrollViewInstance>(null);

  const handleTab = (tab: StudentTab) => goToAlunoTab(navigation, tab);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), from: 'aluno', text, time: nowLabel() }]);
    setDraft('');
  };

  return (
    <PhoneFrame>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.contact}>{instructorName}</Text>
          <Text style={styles.title}>Mensagens</Text>
        </View>

        <ScrollView
          ref={listRef}
          style={styles.flex}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </ScrollView>

        <MessageInput value={draft} onChangeText={setDraft} onSend={send} />
      </KeyboardAvoidingView>

      <BottomMenu active="Mensagens" onSelect={handleTab} />
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 14 },
  contact: { color: colors.muted, fontSize: 12 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 8, flexGrow: 1 },
});
