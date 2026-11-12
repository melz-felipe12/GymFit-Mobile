import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import withAlunoMenu from './withAlunoMenu';

import Login from '../nelson/screens/Login';
import AlunoInicio from '../caylanne/screens/AlunoInicio';
import InstrutorInicio from '../caylanne/screens/InstrutorInicio';
import AlunoProgresso from '../felipe/screens/AlunoProgresso';
import AlunoMensagens from '../felipe/screens/AlunoMensagens';
import Treino from '../julio/screens/treino';
import Historico from '../julio/screens/historico';
import Perfil from '../julio/screens/perfil';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Criadas uma única vez (fora do render) para não remontar a tela a cada render.
const TreinoComMenu = withAlunoMenu(Treino, 'Treino');
const HistoricoComMenu = withAlunoMenu(Historico, 'Histórico');
const PerfilComMenu = withAlunoMenu(Perfil, 'Perfil');

// getId faz o navigate() voltar para a tela já aberta em vez de empilhar outra cópia,
// então trocar de aba várias vezes não enche a pilha.
const unica = () => 'unica';

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Login" component={Login} />

      {/* Aluno */}
      <Stack.Screen name="AlunoInicio" component={AlunoInicio} getId={unica} />
      <Stack.Screen name="Treino" component={TreinoComMenu} getId={unica} />
      <Stack.Screen name="Historico" component={HistoricoComMenu} getId={unica} />
      <Stack.Screen name="AlunoProgresso" component={AlunoProgresso} getId={unica} />
      <Stack.Screen name="AlunoMensagens" component={AlunoMensagens} getId={unica} />
      <Stack.Screen name="Perfil" component={PerfilComMenu} getId={unica} />

      {/* Instrutor */}
      <Stack.Screen name="InstrutorInicio" component={InstrutorInicio} getId={unica} />
    </Stack.Navigator>
  );
}
