import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/felipe/styles/theme';

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: '#202020', card: colors.background, text: colors.text },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
