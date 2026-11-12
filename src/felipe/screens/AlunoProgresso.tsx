import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import WeekFrequency from '../components/WeekFrequency';
import BottomMenu, { StudentTab } from '../components/BottomMenu';
import PhoneFrame from '../components/PhoneFrame';
import { RootStackParamList } from '../../navigation/types';
import { goToAlunoTab } from '../../navigation/alunoTabs';
import { progressStats, weekFrequency } from '../data/mock';
import { colors } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AlunoProgresso'>;

export default function AlunoProgresso({ navigation }: Props) {
  const handleTab = (tab: StudentTab) => goToAlunoTab(navigation, tab);

  return (
    <PhoneFrame>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Progresso</Text>

        <View style={styles.statsRow}>
          <StatCard value={progressStats.workoutsInMonth} label="treinos no mês" />
          <StatCard value={progressStats.streakDays} label="dias seguidos" accent={colors.orange} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Frequência semanal" />
          <WeekFrequency days={weekFrequency} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Tempo médio por treino" />
          <Card style={styles.avgCard}>
            <Text style={styles.avgValue}>{progressStats.averageMinutes} min</Text>
          </Card>
        </View>
      </ScrollView>

      <BottomMenu active="Progresso" onSelect={handleTab} />
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 22, flexGrow: 1 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 9 },
  section: { marginTop: 22 },
  avgCard: { paddingVertical: 18, paddingHorizontal: 16 },
  avgValue: { color: colors.text, fontSize: 22, fontWeight: '700' },
});
