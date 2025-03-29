import { View, Text } from 'react-native';
import '../global.css'


export default function MainLayout({ children }: any) {
  return (
    <View className='flex-1 items-center '>
      <Text>Barra de Navegação ou Cabeçalho</Text>
      <View className='flex-1 items-center justify-center'>
        {children}
      </View>

      <View>
        <Text className=' text-xl font-bold'>Footer</Text>
      </View>
      
    </View>
  );
}
