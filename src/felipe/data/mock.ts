export type DayFrequency = { short: string; full: string; done: boolean };

export type ChatMessage = {
  id: string;
  from: 'instrutor' | 'aluno';
  text: string;
  time: string;
};

// S T Q Q S S D — igual ao layout (treinou seg, ter, qui e sex)
export const weekFrequency: DayFrequency[] = [
  { short: 'S', full: 'Segunda', done: true },
  { short: 'T', full: 'Terça', done: true },
  { short: 'Q', full: 'Quarta', done: false },
  { short: 'Q', full: 'Quinta', done: true },
  { short: 'S', full: 'Sexta', done: true },
  { short: 'S', full: 'Sábado', done: false },
  { short: 'D', full: 'Domingo', done: false },
];

export const progressStats = {
  workoutsInMonth: 14,
  streakDays: 3,
  averageMinutes: 50,
};

export const instructorName = 'Prof. Marcos';

export const initialMessages: ChatMessage[] = [
  { id: '1', from: 'instrutor', text: 'Aumente a carga do supino para 42kg essa semana.', time: 'Hoje, 09:14' },
  { id: '2', from: 'instrutor', text: 'Muito bom o treino de ontem! Continue nesse ritmo.', time: 'Ontem, 19:10' },
  { id: '3', from: 'aluno', text: 'Beleza, professor! Vou ajustar hoje.', time: 'Ontem, 19:15' },
];
