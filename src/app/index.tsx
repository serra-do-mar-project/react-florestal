'use client'

import { View, Image, Text, SafeAreaView, Dimensions } from "react-native";
import images from "../constants/images";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "expo-router";
import BottomBar from "../components/Bottombar";

const { height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center z-10">
        
        <View className="mt-8">
           <images.logoparque width={300} height={120} />
        </View>

        <View className="mb-2 mt-1 px-2">

          <Text className="text-center text-3xl font-semibold text-black leading-7">
            Manual de Procedimentos Operacionais e Adimistrativos
          </Text>
        </View>

        <SafeAreaView className={`mt-2 w-full relative`} style={{ height: height - 265 }}>
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
        </SafeAreaView>
    
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}
