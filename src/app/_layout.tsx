import { View, Text } from 'react-native';
import './global.css'
import { Stack } from 'expo-router';


export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}/>
     
  );
}
