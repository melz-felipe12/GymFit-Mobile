import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tela from '../components/Tela';
import Card from '../components/Card';
import { cores } from '../constants/cores';

const treinos = [
  { id: '1', nome: 'Costas e Biceps', data: 'Sabado, 05/09', duracao: '48 min', horario: '18:02 — 18:50', feitos: 5 },
  { id: '2', nome: 'Pernas', data: 'Quinta, 03/09', duracao: '55 min', horario: '07:10 — 08:05', feitos: 4 },
  { id: '3', nome: 'Costas e Biceps', data: 'Terca, 01/09', duracao: '46 min', horario: '18:15 — 19:01', feitos: 5 },
];

export default function Historico() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <Tela titulo="Historico">
      {treinos.map((t) => (
        <Card
          key={t.id}
          destaque={selecionado === t.id}
          onPress={() => setSelecionado(selecionado === t.id ? null : t.id)}
        >
          <View style={styles.linha}>
            <View>
              <Text style={styles.nome}>{t.nome}</Text>
              <Text style={styles.data}>{t.data}</Text>
            </View>
            <Text style={styles.duracao}>{t.duracao}</Text>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <Text style={styles.horario}>{t.horario}</Text>
            <Text style={[styles.exercicios, { color: t.feitos === 5 ? cores.verde : cores.amarelo }]}>
              {t.feitos}/5 exercicios
            </Text>
          </View>
        </Card>
      ))}
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nome: { color: cores.texto, fontSize: 16, fontWeight: '600' },
  data: { color: cores.textoSecundario, fontSize: 12, marginTop: 2 },
  duracao: { color: cores.texto, fontSize: 20, fontWeight: '600' },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: 10 },
  horario: { color: cores.textoTerciario, fontSize: 11 },
  exercicios: { fontSize: 11 },
});