import './global.css'
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function MainLayout() {
  return (
    
    <>
      <Stack screenOptions={{ headerShown: false}}/>
      <StatusBar hidden={true}/>
    </>
  );
}
