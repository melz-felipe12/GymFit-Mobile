import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import BottomMenu from '../components/BottomMenu';
import SectionTitle from '../components/SectionTitle';
import { colors } from '../styles/theme';
import { goToAlunoTab } from '../../navigation/alunoTabs';

const week = [
  { day: 'S', done: true },
  { day: 'T', done: true },
  { day: 'Q', done: false },
  { day: 'Q', done: true },
  { day: 'S', done: true },
  { day: 'S', done: false },
  { day: 'D', done: false },
];

const workouts = [
  {
    id: 1,
    name: 'Peito e Tríceps',
    exercises: '6 exercícios',
    duration: 'cerca de 50 min',
    items: [
      { name: 'Supino reto', sets: '4 séries', reps: '10-12 reps', load: '40 kg' },
      { name: 'Crucifixo', sets: '3 séries', reps: '12 reps', load: '14 kg' },
      { name: 'Supino inclinado', sets: '3 séries', reps: '10 reps', load: '30 kg' },
      { name: 'Tríceps corda', sets: '4 séries', reps: '12 reps', load: '25 kg' },
      { name: 'Tríceps testa', sets: '3 séries', reps: '12 reps', load: '15 kg' },
      { name: 'Tríceps unilateral', sets: '3 séries', reps: '12 reps', load: '8 kg' },
    ],
  },
  {
    id: 2,
    name: 'Costas e Bíceps',
    exercises: '7 exercícios',
    duration: 'cerca de 55 min',
    items: [
      { name: 'Puxada frontal', sets: '4 séries', reps: '12 reps', load: '35 kg' },
      { name: 'Remada baixa', sets: '3 séries', reps: '12 reps', load: '30 kg' },
      { name: 'Remada curvada', sets: '3 séries', reps: '10 reps', load: '20 kg' },
      { name: 'Pulldown', sets: '3 séries', reps: '12 reps', load: '20 kg' },
      { name: 'Rosca direta', sets: '3 séries', reps: '12 reps', load: '12 kg' },
      { name: 'Rosca alternada', sets: '3 séries', reps: '10 reps', load: '8 kg' },
      { name: 'Rosca martelo', sets: '3 séries', reps: '12 reps', load: '8 kg' },
    ],
  },
  {
    id: 3,
    name: 'Quadríceps',
    exercises: '5 exercícios',
    duration: 'cerca de 45 min',
    items: [
      { name: 'Cadeira extensora', sets: '4 séries', reps: '12 reps', load: '30 kg' },
      { name: 'Agachamento livre', sets: '4 séries', reps: '10 reps', load: '20 kg' },
      { name: 'Leg press', sets: '3 séries', reps: '12 reps', load: '80 kg' },
      { name: 'Agachamento búlgaro', sets: '3 séries', reps: '10 reps', load: '8 kg' },
      { name: 'Cadeira extensora unilateral', sets: '3 séries', reps: '12 reps', load: '15 kg' },
    ],
  },
  {
    id: 4,
    name: 'Glúteos',
    exercises: '6 exercícios',
    duration: 'cerca de 50 min',
    items: [
      { name: 'Elevação pélvica', sets: '4 séries', reps: '12 reps', load: '40 kg' },
      { name: 'Cadeira abdutora', sets: '4 séries', reps: '15 reps', load: '35 kg' },
      { name: 'Coice na polia', sets: '3 séries', reps: '12 reps', load: '10 kg' },
      { name: 'Agachamento sumô', sets: '3 séries', reps: '12 reps', load: '20 kg' },
      { name: 'Stiff', sets: '3 séries', reps: '12 reps', load: '20 kg' },
      { name: 'Glúteo no aparelho', sets: '3 séries', reps: '12 reps', load: '20 kg' },
    ],
  },
];

export default function AlunoInicio({ navigation }) {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [workoutStatus, setWorkoutStatus] = useState('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [completedExercises, setCompletedExercises] = useState([]);
  const [weekProgress, setWeekProgress] = useState(week);
  const [confirmingFinish, setConfirmingFinish] = useState(false);
  const [summary, setSummary] = useState(null);

  // Atualiza o relógio enquanto o treino estiver ativo
  useEffect(() => {
    if (workoutStatus !== 'running') return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutStatus]);

  // Calcula o tempo total, descontando as pausas
  const currentElapsed =
    elapsedMs +
    (workoutStatus === 'running' && startedAt
      ? now - startedAt
      : 0);

  // Formata o cronômetro em HH:MM:SS
  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0'),
    ].join(':');
  }

  // Iniciar treino: abre o pop-up e já inicia o cronômetro
  function startWorkout(workout) {
    setActiveWorkout(workout);
    setCompletedExercises([]);
    setElapsedMs(0);
    setStartedAt(Date.now());
    setNow(Date.now());
    setWorkoutStatus('running');
  }

  // Marca ou desmarca um exercício como concluído
  function toggleExercise(index) {
    setCompletedExercises((previous) => {
      if (previous.includes(index)) {
        return previous.filter((item) => item !== index);
      }

      return [...previous, index];
    });
  }

  // Pausar treino
  function pauseWorkout() {
    setElapsedMs(currentElapsed);
    setStartedAt(null);
    setWorkoutStatus('paused');
  }

  // Retomar treino
  function resumeWorkout() {
    setStartedAt(Date.now());
    setNow(Date.now());
    setWorkoutStatus('running');
  }

  // Abre a confirmação (dentro do próprio pop-up)
  function requestFinish() {
    setConfirmingFinish(true);
  }

  // Cancela a confirmação e continua treinando
  function cancelFinish() {
    setConfirmingFinish(false);
  }

  // Confirma: registra o dia, guarda o resumo e encerra o treino
  function confirmFinish() {
    const finalTime = currentElapsed;
    const finishedWorkout = activeWorkout;

    // Marca o dia atual na semana (segunda a domingo)
    const today = new Date().getDay();
    const weekIndex = today === 0 ? 6 : today - 1;

    setWeekProgress((previous) =>
      previous.map((item, index) =>
        index === weekIndex
          ? { ...item, done: true }
          : item
      )
    );

    setSummary({
      name: finishedWorkout.name,
      done: completedExercises.length,
      total: finishedWorkout.items.length,
      time: formatTime(finalTime),
    });

    setConfirmingFinish(false);
    setWorkoutStatus('idle');
    setActiveWorkout(null);
    setElapsedMs(0);
    setStartedAt(null);
    setCompletedExercises([]);
  }

  // Fecha o resumo final
  function closeSummary() {
    setSummary(null);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.phone}>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* CABEÇALHO */}
          <View style={styles.topRow}>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>

            <Pressable
              style={styles.avatar}
              onPress={() => navigation.navigate('InstrutorInicio')}
            >
              <Text style={styles.avatarText}>NA</Text>
            </Pressable>
          </View>

          <Text style={styles.greeting}>Olá, Caylanne!</Text>

          {/* CARDS DE TREINO */}
          <View style={styles.section}>
            <SectionTitle title="Treinos disponíveis" />

            {workouts.map((workout) => (
              <Card key={workout.id} style={styles.workoutCard}>

                <Text style={styles.eyebrow}>
                  Treino disponível
                </Text>

                <Text style={styles.workoutName}>
                  {workout.name}
                </Text>

                <Text style={styles.subtitle}>
                  {workout.exercises}, {workout.duration}
                </Text>

                <Pressable
                  style={styles.primaryButton}
                  onPress={() => startWorkout(workout)}
                  disabled={workoutStatus !== 'idle'}
                >
                  <Text style={styles.primaryButtonText}>
                    {workoutStatus !== 'idle'
                      ? activeWorkout?.id === workout.id
                        ? 'Treino em andamento'
                        : 'Outro treino em andamento'
                      : 'Iniciar treino'}
                  </Text>
                </Pressable>

              </Card>
            ))}
          </View>

          {/* FREQUÊNCIA RECENTE */}
          <View style={styles.section}>
            <SectionTitle
              title="Frequência recente"
              action="Ver tudo"
              onActionPress={() =>
                Alert.alert(
                  'Frequência',
                  'Histórico de frequência demonstrativo.'
                )
              }
            />

            <Card style={styles.frequencyCard}>
              <View style={styles.weekRow}>
                {weekProgress.map((item, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <View
                      style={[
                        styles.bar,
                        item.done
                          ? styles.barDone
                          : styles.barEmpty,
                      ]}
                    />
                    <Text style={styles.dayText}>
                      {item.day}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>

          {/* ÚLTIMO TREINO */}
          <View style={styles.section}>
            <SectionTitle title="Último treino" />

            <Card style={styles.lastWorkout}>
              <View>
                <Text style={styles.lastTitle}>
                  Costas e Bíceps
                </Text>
                <Text style={styles.subtitle}>
                  Sábado, 05/09 — 48 min
                </Text>
              </View>

              <Ionicons
                name="checkmark"
                size={17}
                color={colors.teal}
              />
            </Card>
          </View>

        </ScrollView>

        {/* MENU INFERIOR */}
        <BottomMenu
          role="aluno"
          active="Início"
          onSelect={(tab) => goToAlunoTab(navigation, tab)}
        />

      </View>

      {/* POP-UP ÚNICO: EXERCÍCIOS + CRONÔMETRO */}
      <Modal
        visible={!!activeWorkout || !!summary}
        transparent
        animationType="slide"
        onRequestClose={() => { }}
      >
        <View style={styles.modalOverlay}>
          {summary ? (
            <View style={styles.modalCard}>
              <View style={styles.modalIcon}>
                <Ionicons
                  name="checkmark-circle"
                  size={25}
                  color={colors.teal}
                />
              </View>

              <Text style={styles.modalLabel}>TREINO CONCLUÍDO</Text>

              <Text style={styles.modalWorkoutName}>
                {summary.name}
              </Text>

              <Text style={styles.summaryText}>
                Exercícios realizados: {summary.done}/{summary.total}
              </Text>
              <Text style={styles.summaryText}>
                Tempo total: {summary.time}
              </Text>
              <Text style={styles.summaryNote}>
                Seu dia foi marcado como concluído na frequência semanal.
              </Text>

              <Pressable
                style={[styles.resumeButton, styles.summaryButton]}
                onPress={closeSummary}
              >
                <Text style={styles.resumeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          ) : (
          <View style={styles.modalCard}>

            <View style={styles.modalIcon}>
              <Ionicons
                name="barbell"
                size={25}
                color={colors.orange}
              />
            </View>

            <Text style={styles.modalLabel}>
              TREINO EM ANDAMENTO
            </Text>

            <Text style={styles.modalWorkoutName}>
              {activeWorkout?.name}
            </Text>

            {/* CRONÔMETRO */}
            <View style={styles.timerContainer}>
              <Text style={styles.timer}>
                {formatTime(currentElapsed)}
              </Text>

              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        workoutStatus === 'running'
                          ? colors.teal
                          : colors.orange,
                    },
                  ]}
                />

                <Text style={styles.timerStatus}>
                  {workoutStatus === 'running'
                    ? 'Treino em andamento'
                    : 'Treino pausado'}
                </Text>
              </View>
            </View>

            {/* PROGRESSO DOS EXERCÍCIOS */}
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseHeaderText}>
                SEUS EXERCÍCIOS
              </Text>

              <Text style={styles.exerciseCount}>
                {completedExercises.length}/{activeWorkout?.items.length}
              </Text>
            </View>

            {/* LISTA */}
            <ScrollView
              style={styles.exerciseList}
              showsVerticalScrollIndicator={false}
            >
              {activeWorkout?.items.map((exercise, index) => {
                const completed = completedExercises.includes(index);

                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.exerciseItem,
                      completed && styles.exerciseCompleted,
                    ]}
                    onPress={() => toggleExercise(index)}
                  >
                    <View
                      style={[
                        styles.exerciseCheck,
                        completed && styles.exerciseCheckDone,
                      ]}
                    >
                      {completed && (
                        <Ionicons
                          name="checkmark"
                          size={17}
                          color="#171717"
                        />
                      )}
                    </View>

                    <View style={styles.exerciseInfo}>
                      <Text
                        style={[
                          styles.exerciseName,
                          completed && styles.exerciseNameDone,
                        ]}
                      >
                        {exercise.name}
                      </Text>

                      <Text style={styles.exerciseDetails}>
                        {exercise.sets} • {exercise.reps}
                      </Text>

                      <Text style={styles.exerciseLoad}>
                        Carga: {exercise.load}
                      </Text>
                    </View>

                    <Ionicons
                      name="barbell-outline"
                      size={19}
                      color={colors.muted}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* PAUSAR OU RETOMAR */}
            {workoutStatus === 'running' ? (
              <Pressable
                style={styles.pauseButton}
                onPress={pauseWorkout}
              >
                <Ionicons
                  name="pause"
                  size={19}
                  color="#FFFFFF"
                />

                <Text style={styles.modalButtonText}>
                  Pausar treino
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.resumeButton}
                onPress={resumeWorkout}
              >
                <Ionicons
                  name="play"
                  size={19}
                  color="#171717"
                />

                <Text style={styles.resumeButtonText}>
                  Retomar treino
                </Text>
              </Pressable>
            )}

            {/* FINALIZAR */}
            <Pressable
              style={styles.finishButton}
              onPress={requestFinish}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#FFFFFF"
              />

              <Text style={styles.modalButtonText}>
                Finalizar treino
              </Text>
            </Pressable>

            {/* CONFIRMAÇÃO DE FINALIZAÇÃO */}
            {confirmingFinish && (
              <View style={styles.confirmOverlay}>
                <Text style={styles.confirmTitle}>
                  Finalizar treino?
                </Text>

                <Text style={styles.confirmText}>
                  Deseja realmente finalizar o treino e registrar este dia como concluído?
                </Text>

                <Pressable
                  style={styles.resumeButton}
                  onPress={cancelFinish}
                >
                  <Text style={styles.resumeButtonText}>
                    Continuar treinando
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.finishButton}
                  onPress={confirmFinish}
                >
                  <Text style={styles.modalButtonText}>
                    Finalizar
                  </Text>
                </Pressable>
              </View>
            )}

          </View>
          )}
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
  },

  phone: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    backgroundColor: colors.background,
    borderRadius: 29,
    overflow: 'hidden',
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
    flexGrow: 1,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  date: {
    color: colors.muted,
    fontSize: 11,
  },

  avatar: {
    width: 33,
    height: 33,
    borderRadius: 17,
    backgroundColor: '#292E35',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
  },

  greeting: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 13,
  },

  section: {
    marginTop: 14,
  },

  workoutCard: {
    backgroundColor: colors.surfaceAlt,
    padding: 13,
    borderRadius: 15,
    marginBottom: 12,
  },

  eyebrow: {
    color: colors.muted,
    fontSize: 10,
  },

  workoutName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },

  primaryButton: {
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11,
  },

  primaryButtonText: {
    color: '#171717',
    fontSize: 12,
    fontWeight: '700',
  },

  frequencyCard: {
    paddingVertical: 14,
    paddingHorizontal: 13,
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },

  bar: {
    width: 18,
    borderRadius: 6,
    marginBottom: 5,
  },

  barDone: {
    height: 30,
    backgroundColor: colors.orange,
  },

  barEmpty: {
    height: 6,
    backgroundColor: '#292E35',
    borderWidth: 1,
    borderColor: '#343A42',
  },

  dayText: {
    color: '#858A92',
    fontSize: 8,
  },

  lastWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  lastTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  // POP-UP
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  modalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '90%',
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },

  modalIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#34302E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  modalLabel: {
    color: colors.orange,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  modalWorkoutName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },

  timerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },

  timer: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 7,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  timerStatus: {
    color: colors.muted,
    fontSize: 12,
  },

  pauseButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#343941',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  resumeButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.orange,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  finishButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#A83D3D',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  resumeButtonText: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '700',
  },

  exerciseHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 12,
  },

  exerciseHeaderText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  exerciseCount: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '700',
  },

  exerciseList: {
    width: '100%',
    maxHeight: 280,
    flexShrink: 1,
  },

  exerciseItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 13,
    padding: 12,
    marginBottom: 9,
    gap: 11,
  },

  exerciseInfo: {
    flex: 1,
  },

  exerciseName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  exerciseDetails: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },

  exerciseLoad: {
    color: colors.teal,
    fontSize: 10,
    marginTop: 3,
  },

  exerciseCompleted: {
    borderWidth: 1,
    borderColor: colors.teal,
    opacity: 0.75,
  },

  exerciseCheck: {
    width: 25,
    height: 25,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  exerciseCheckDone: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },

  exerciseNameDone: {
    textDecorationLine: 'line-through',
    color: colors.muted,
  },

  // CONFIRMAÇÃO E RESUMO
  confirmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  confirmTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  confirmText: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },

  summaryText: {
    color: colors.text,
    fontSize: 14,
    marginTop: 10,
  },

  summaryNote: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },

  summaryButton: {
    marginTop: 22,
  },
});
