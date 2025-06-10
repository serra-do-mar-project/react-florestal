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
        
        {/* Logo no topo */}
        <View className="mt-6">
          <images.logoparque width={300} height={100} />
        </View>

        {/* Título */}
        <View className="mt-4 px-5">
          <Text className="text-center text-lg font-bold text-black leading-7">
            MANUAL DE PROCEDIMENTOS{"\n"}
            OPERACIONAIS E ADMINISTRATIVOS
          </Text>
        </View>

        {/* Imagem da floresta */}
        <View className="mt-5 w-full h-[60%] relative">
          <Image
            source={images.splashbg}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Botão sobreposto à imagem */}
          <View className="absolute bottom-24 w-full items-center">
            <SubmitButton
              title="ENTRAR"
              onPress={() => router.push("/loginPage")}
            />
          </View>
        </View>

        {/* Barra inferior verde com logos */}
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}
