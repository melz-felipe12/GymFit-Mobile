import { View, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

type Props = {
  focused: boolean;
};

export default function IconeAba({ focused }: Props) {
  return <View style={[styles.icone, focused && styles.ativo]} />;
}

const styles = StyleSheet.create({
  icone: { width: 22, height: 22, borderRadius: 6, backgroundColor: cores.borda },
  ativo: { backgroundColor: cores.laranja },
});