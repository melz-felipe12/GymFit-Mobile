import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomMenu, { StudentTab } from '../felipe/components/BottomMenu';
import PhoneFrame from '../felipe/components/PhoneFrame';
import { goToAlunoTab } from './alunoTabs';

/**
 * As telas do Julio (Treino, Histórico, Perfil) não tinham menu próprio: dependiam
 * do <Tabs> do expo-router. Este wrapper encaixa o BottomMenu do aluno embaixo delas
 * sem precisar alterar o código dessas telas.
 */
export default function withAlunoMenu(Screen: React.ComponentType<any>, active: StudentTab) {
  return function TelaComMenu(props: any) {
    return (
      <PhoneFrame>
        <View style={styles.body}>
          <Screen {...props} />
        </View>
        <BottomMenu active={active} onSelect={(tab) => goToAlunoTab(props.navigation, tab)} />
      </PhoneFrame>
    );
  };
}

const styles = StyleSheet.create({
  body: { flex: 1 },
});
