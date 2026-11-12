import React, { useRef, useState } from 'react';
import {
  Animated, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView,
  ScrollView, StatusBar, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { validate } from '../validate.js';
 
const C = {
  bg: '#17171a', panel: '#212126', field: '#2a2a30', border: '#36363d',
  text: '#f2f2f4', muted: '#9a9aa3', accent: '#ff7a3d', error: '#ff5d5d',
};
 
const EMAIL = { name: 'email', label: 'E-mail', placeholder: 'voce@email.com', keyboardType: 'email-address' };
 
const FIELDS = {
  login: [
    EMAIL,
    { name: 'senha', label: 'Senha', placeholder: 'Sua senha', secureTextEntry: true },
  ],
  cadastro: [
    EMAIL,
    { name: 'senha', label: 'Senha', placeholder: 'Mínimo de 6 caracteres', secureTextEntry: true },
    { name: 'confirma', label: 'Confirmar senha', placeholder: 'Repita a senha', secureTextEntry: true },
  ],
};

export default function Login({ navigation }) {
  const [tab, setTab] = useState('cadastro');
  const [values, setValues] = useState({ email: '', senha: '', confirma: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const fade = useRef(new Animated.Value(1)).current;
 
  const changeTab = (next) => {
    if (next === tab) return;
    setTab(next);
    setErrors({});
    setMessage('');
    setValues((v) => ({ ...v, senha: '', confirma: '' }));
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  };
 
  const submit = () => {
    const e = validate(tab, values);
    setErrors(e);
    if (Object.keys(e).length) return;
 
    console.log(tab, values);
    if (tab === 'cadastro') {
      changeTab('login');
      setMessage('Conta criada! Entre com seu e-mail e senha.');
    } else {
      setMessage('Login realizado!');
      navigation.reset({ index: 0, routes: [{ name: 'AlunoInicio' }] });
    }
  };
 
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
          <Image source={require('../../../assets/logo.png')} style={s.logo} resizeMode="contain" />
          <Text style={s.tagline}>Acompanhamento de treinos da sua academia.</Text>
 
          <View style={s.tabs}>
            {[['login', 'Entrar'], ['cadastro', 'Cadastrar']].map(([key, text]) => (
              <Pressable key={key} style={[s.tab, tab === key && s.tabActive]} onPress={() => changeTab(key)}>
                <Text style={[s.tabText, tab === key && { color: C.text }]}>{text}</Text>
              </Pressable>
            ))}
          </View>
 
          <Animated.View style={{ opacity: fade }}>
            {FIELDS[tab].map(({ name, label, ...input }) => (
              <View key={name} style={s.field}>
                <Text style={s.label}>{label}</Text>
                <TextInput
                  {...input}
                  value={values[name]}
                  onChangeText={(t) => {
                    setValues({ ...values, [name]: t });
                    setErrors({ ...errors, [name]: undefined });
                  }}
                  autoCapitalize="none"
                  placeholderTextColor="#6c6c75"
                  style={[s.input, errors[name] && { borderColor: C.error }]}
                />
                {!!errors[name] && <Text style={s.error}>{errors[name]}</Text>}
              </View>
            ))}
 
            <Pressable style={s.submit} onPress={submit}>
              <Text style={s.submitText}>{tab === 'login' ? 'Entrar' : 'Cadastrar'}</Text>
            </Pressable>
 
            {!!message && <Text style={s.message}>{message}</Text>}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
 
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
 
  logo: { width: 120, height: 100, marginBottom: 10 },
  tagline: { color: C.muted, fontSize: 14, marginBottom: 28 },
 
  tabs: {
    flexDirection: 'row', backgroundColor: C.panel, borderWidth: 1,
    borderColor: C.border, borderRadius: 14, padding: 4, marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: C.field },
  tabText: { color: C.muted, fontSize: 14, fontWeight: '600' },
 
  field: { marginBottom: 16 },
  label: { color: C.muted, fontSize: 13, marginBottom: 6 },
  input: {
    backgroundColor: C.field, borderWidth: 1, borderColor: 'transparent',
    borderRadius: 10, color: C.text, fontSize: 14, padding: 13,
  },
  error: { color: C.error, fontSize: 12, marginTop: 6 },
 
  submit: { backgroundColor: C.accent, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 8 },
  submitText: { color: '#17171a', fontSize: 15, fontWeight: '700' },
  message: { color: C.accent, fontSize: 13, textAlign: 'center', marginTop: 16 },
});
 
