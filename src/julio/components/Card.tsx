import { ReactNode } from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { cores } from '../constants/cores';

type Props = {
  children: ReactNode;
  destaque?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, destaque, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, destaque && styles.destaque, style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
  },
  destaque: { borderColor: cores.laranja },
});