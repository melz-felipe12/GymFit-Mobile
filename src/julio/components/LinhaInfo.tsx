import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

type Props = {
  label: string;
  valor: string;
};

export default function LinhaInfo({ label, valor }: Props) {
  return (
    <View style={styles.linha}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 2 },
  label: { color: cores.textoSecundario, fontSize: 13 },
  valor: { color: cores.texto, fontSize: 13 },
});