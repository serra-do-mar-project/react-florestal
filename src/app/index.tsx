'use client'

import { View, Image, Text, Dimensions } from "react-native";
import images from "../constants/images";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "expo-router";
import BottomBar from "../components/Bottombar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";

const { height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
        <View className=" items-center gap-3 flex-[1/3]">
          <images.logoparque width={200} height={120} />
          <View className="items-center">

            <Text 
              className="w-full text-center font-semibold text-[#45503F] stroke-black leading-8" 
              style={{fontSize: 28}}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}>

            Manual de Procedimentos

          </Text>

          <Text 
            className="w-full text-center font-semibold text-[#45503F] stroke-black leading-8"  
            style={{fontSize: 22}}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}>

            Operacionais e Administrativos
            
          </Text>
          </View>
        </View>
        
        <View className="w-full flex-1 relative mb-auto">
          <LinearGradient 
            colors={['#FFFFFF', 'transparent']}
            className="absolute top-0 z-10 h-10 w-full">
          </LinearGradient>  

          <Image
            source={images.splashbg}
            className="w-full h-full"
            resizeMode="cover"
          />

          <View className="absolute bottom-24 w-full items-center">
            <SubmitButton
              title="Entrar"
              onPress={() => router.push("/loginPage")}
            />
          </View>
        </View>
    
        <BottomBar />
    </SafeAreaView>
  );
}
