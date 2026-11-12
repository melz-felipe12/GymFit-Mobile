import { Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

type Props = {
  titulo: string;
  onPress?: () => void;
};

export default function Botao({ titulo, onPress }: Props) {
  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.bordaVermelha,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  texto: { color: cores.vermelho, fontSize: 16 },
});