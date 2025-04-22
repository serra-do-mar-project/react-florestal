import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css'
import { Stack } from 'expo-router';


export default function MainLayout() {
  return (
   <SafeAreaView className='flex-1'>
    <Stack screenOptions={{ headerShown: false}}/>
   </SafeAreaView>
    
    
  );
}
