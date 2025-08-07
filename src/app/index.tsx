'use client'

import { View, Image, Text, Dimensions } from "react-native";
import images from "../constants/images";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "expo-router";
import BottomBar from "../components/Bottombar";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
        <View className="mt-6 px-5 items-center gap-3 flex-[1/3]">
          <images.logoparque width={300} height={150} />
          <Text className="text-center text-2xl font-bold text-black leading-7">
            MANUAL DE PROCEDIMENTOS{"\n"}
            OPERACIONAIS E ADMINISTRATIVOS
          </Text>
        </View>

        <View className="mt-2 w-full flex-1 relative mb-auto">
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
