import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css'
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';


export default function MainLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false}}/>
      <StatusBar translucent style="light" />
    </>
  );
}
