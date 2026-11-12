import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tela from '../components/Tela';
import Card from '../components/Card';
import LinhaInfo from '../components/LinhaInfo';
import Botao from '../components/Botao';
import { cores } from '../constants/cores';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export default function Perfil({ navigation }: NativeStackScreenProps<RootStackParamList, 'Perfil'>) {
  const [saindo, setSaindo] = useState(false);

  return (
    <Tela titulo="Perfil">
      <Card style={styles.cardPerfil}>
        <View style={styles.avatar}>
          <Text style={styles.iniciais}>NF</Text>
        </View>
        <View>
          <Text style={styles.nome}>Nelson Filho</Text>
          <Text style={styles.desde}>Aluno desde marco de 2026</Text>
        </View>
      </Card>

      <LinhaInfo label="Instrutor" valor="Prof. Marcos" />
      <LinhaInfo label="Plano" valor="Musculacao — 5x semana" />
      <LinhaInfo label="E-mail" valor="nelson.alves@email.com" />

      <Botao titulo={saindo ? 'Saindo...' : 'Sair'} onPress={() => {
        setSaindo(true);
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  cardPerfil: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 12 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: cores.borda,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iniciais: { color: cores.texto, fontSize: 15, fontWeight: '700' },
  nome: { color: cores.texto, fontSize: 16, fontWeight: '600' },
  desde: { color: cores.textoSecundario, fontSize: 12, marginTop: 2 },
});