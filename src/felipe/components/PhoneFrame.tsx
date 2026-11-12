import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, layout } from '../styles/theme';

type Props = { children: React.ReactNode };

/**
 * No celular ocupa a tela toda. No navegador (desktop) centraliza uma
 * "tela de celular" de 390px, com altura limitada pela janela.
 */
export default function PhoneFrame({ children }: Props) {
  const { width, height } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width > layout.phoneWidth + 40;
  const phoneHeight = Math.min(layout.phoneHeight, height - 32);

  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[
          styles.phone,
          isDesktopWeb ? [styles.phoneDesktop, { height: phoneHeight, marginVertical: 16 }] : styles.phoneMobile,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#202020', alignItems: 'center', justifyContent: 'center' },
  phone: {
    width: '100%',
    maxWidth: layout.phoneWidth,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  // Celular: ocupa a tela toda.
  phoneMobile: { flex: 1 },
  // Desktop web: altura fixa. Não usar `flex` aqui: no react-native-web `flex: 0`
  // vira `flex-basis: 0%`, que ignora o `height` e colapsa a tela numa barra.
  phoneDesktop: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    borderRadius: 29,
    borderWidth: 6,
    borderColor: '#2A2D33',
  },
});
