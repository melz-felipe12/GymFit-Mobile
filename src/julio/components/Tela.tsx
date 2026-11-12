import { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../constants/cores';

type Props = {
  titulo: string;
  children?: ReactNode;
};

export default function Tela({ titulo, children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.titulo}>{titulo}</Text>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, paddingHorizontal: 28 },
  titulo: { color: cores.texto, fontSize: 20, fontWeight: '600', marginTop: 16, marginBottom: 20 },
});