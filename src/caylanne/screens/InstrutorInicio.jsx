import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import BottomMenu from '../components/BottomMenu';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import { colors } from '../styles/theme';

function StudentRow({ initials, name, detail, warning }) {
  return (
    <Card style={[styles.studentRow, warning && styles.warningRow]}>
      <View style={styles.studentAvatar}><Text style={styles.initials}>{initials}</Text></View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={[styles.studentDetail, warning && styles.warningText]}>{detail}</Text>
      </View>
      {warning ? <Ionicons name="alert-circle-outline" size={17} color={colors.yellow} /> : null}
    </Card>
  );
}

export default function InstrutorInicio({ navigation }) {
  const [showAll, setShowAll] = useState(false);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.phone}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
            <Pressable style={styles.avatar} onPress={() => navigation.navigate('AlunoInicio')}>
              <Text style={styles.avatarText}>PM</Text>
            </Pressable>
          </View>

          <Text style={styles.greeting}>Olá, professor Marcos</Text>

          <View style={styles.statsRow}>
            <StatCard value="4" label="alunos ativos" />
            <StatCard value="2" label="treinaram hoje" accent={colors.teal} />
          </View>

          <View style={styles.section}>
            <SectionTitle title="Atenção — baixa frequência" />
            <StudentRow initials="MC" name="Marina Costa" detail="Sem treinar há 9 dias" warning />
          </View>

          <View style={styles.section}>
            <SectionTitle title="Ativos recentemente" action={showAll ? 'Ver menos' : 'Ver todos'}
              onActionPress={() => setShowAll(!showAll)} />
            <StudentRow initials="NF" name="Nelson Filho" detail="Treinou hoje" />
            {showAll ? (
              <>
                <View style={styles.rowGap} />
                <StudentRow initials="LA" name="Lucas Alves" detail="Treinou ontem" />
                <View style={styles.rowGap} />
                <StudentRow initials="JS" name="João Silva" detail="Treinou ontem" />
              </>
            ) : null}
          </View>

          <View style={styles.section}>
            <SectionTitle title="Acesso rápido" />
            <Pressable style={styles.quickButton}
              onPress={() => Alert.alert('Treinos', 'A criação e edição de treinos será integrada pela equipe.')}>
              <Ionicons name="add" size={16} color={colors.text} />
              <Text style={styles.quickButtonText}>Criar ou editar treino</Text>
            </Pressable>
          </View>
        </ScrollView>
        <BottomMenu role="instrutor" active="Início"
          onRoleSwitch={() => navigation.navigate('AlunoInicio')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: 
  { flex: 1, backgroundColor: '#202020', alignItems: 'center' },
  
  pageLabel: 
  { width: '100%', maxWidth: 390, paddingHorizontal: 18, paddingTop: 8, paddingBottom: 7 },

  pageLabelText: { color: colors.text, fontSize: 11 },

  phone: { flex: 1, width: '100%', maxWidth: 390, backgroundColor: colors.background, borderRadius: 29, overflow: 'hidden'},

  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 22, flexGrow: 1 },

  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  date: { color: colors.muted, fontSize: 11 },

  avatar: { width: 33, height: 33, borderRadius: 17, backgroundColor: '#292E35', alignItems: 'center', justifyContent: 'center' },

  avatarText: { color: colors.text, fontSize: 10, fontWeight: '600' },

  greeting: { color: colors.text, fontSize: 16, fontWeight: '600', marginTop: 14, marginBottom: 13 },

  statsRow: { flexDirection: 'row', gap: 9 },

  section: { marginTop: 22 },

  studentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: 12 },

  warningRow: { borderColor: '#55352B' },

  studentAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#292E35', borderWidth: 1, borderColor: '#3A4048', alignItems: 'center', justifyContent: 'center' },

  initials: { color: colors.text, fontSize: 9, fontWeight: '600' },

  studentInfo: { flex: 1, marginLeft: 9 },

  studentName: { color: colors.text, fontSize: 12, fontWeight: '600' },

  studentDetail: { color: colors.muted, fontSize: 9, marginTop: 2 },

  warningText: { color: colors.yellow },

  rowGap: { height: 8 },

  quickButton: { height: 36, backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },

  quickButtonText: { color: colors.text, fontSize: 11 },
});
