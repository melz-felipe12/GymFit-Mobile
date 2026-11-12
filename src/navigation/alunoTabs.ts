import { RootStackParamList } from './types';
import { StudentTab } from '../felipe/components/BottomMenu';

// Aba do menu inferior do aluno -> rota registrada no AppNavigator.
export const alunoTabRoutes: Record<StudentTab, keyof RootStackParamList> = {
  'Início': 'AlunoInicio',
  'Treino': 'Treino',
  'Histórico': 'Historico',
  'Progresso': 'AlunoProgresso',
  'Mensagens': 'AlunoMensagens',
  'Perfil': 'Perfil',
};

// Usado por todas as telas do aluno no onSelect do BottomMenu.
// `navigation` é tipado de forma frouxa para servir tanto às telas .tsx quanto às .jsx.
export function goToAlunoTab(
  navigation: { navigate: (route: any) => void },
  tab: StudentTab,
) {
  navigation.navigate(alunoTabRoutes[tab]);
}
