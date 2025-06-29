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
        
        <View className="mt-6">
          <images.logoparque width={300} height={150} />
        </View>

        <View className="mt-3 px-5">
          <Text className="text-center text-2xl font-bold text-black leading-7">
            MANUAL DE PROCEDIMENTOS{"\n"}
            OPERACIONAIS E ADMINISTRATIVOS
          </Text>
        </View>

        <View className="mt-2 w-full h-[60%] relative">
          <Image
            source={images.splashbg}
            className="w-full h-full"
            resizeMode="cover"
          />

          <View className="absolute bottom-24 w-full items-center">
            <SubmitButton
              title="ENTRAR"
              onPress={() => router.push("/loginPage")}
            />
          </View>
        </View>

        <BottomBar />
      </View>
    </SafeAreaView>
  );
}
