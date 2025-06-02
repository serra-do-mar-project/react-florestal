'use client'

import { View, Image, Text, SafeAreaView } from "react-native";
import images from "../constants/images";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "expo-router";

export default function Index() {

    const router = useRouter();
 

  return (
    <SafeAreaView className="flex-1">
      <Image
          source={images.splashbg}
          className="absolute w-full h-full"
          resizeMode="cover"
      />
      <View className="z-10 flex-1 items-center">
          <View className="mt-7">
            <images.logoparque width={300} height={120} />
          </View>
          <View className="w-full flex-1 mt-28 justify-center items-center">
            <View className="items-center justify-center relative ml-2">
              <Text
                className="text-5xl font-bold text-[#45503F] opacity-50 absolute left-1 top-1"
                style={{
                  letterSpacing: 1,
                  lineHeight: 52,
                }}
              >
                Manual de{"\n"}
                Procedimentos{"\n"}
                Operacionais e{"\n"}
                Administrativos
              </Text>
              <Text
                className="text-5xl font-bold text-white"
                style={{
                  letterSpacing: 1,
                  lineHeight: 52,
                }}
              >
                Manual de{"\n"}
                Procedimentos{"\n"}
                Operacionais e{"\n"}
                Administrativos
              </Text>
            </View>
          </View>
          <View className="mt-20" >
              <SubmitButton title="Entrar" onPress={() => router.push("/loginPage")}/>
          </View>

          <View className="flex-1 w-full flex-row items-end mx-5 justify-center">
            <View className="flex-1 flex-row items-end justify-around pb-2">
              <View className="items-center justify-center w-24 h-24 bg-transparent">
                <images.ifsplogoBranca width={80} height={50} style={{ resizeMode: "contain" }} />
              </View>
              <View className="items-center justify-center w-24 h-24 bg-transparent">
                <images.fundacaoFlorestalBranca width={100} height={100} style={{ resizeMode: "contain" }} />
              </View>
              <View className="items-center justify-center w-24 h-24 bg-transparent">
                <images.splogoBranca alt="imagem da logo de são paulo não ofcial" width={70
                } height={80} style={{ resizeMode: "contain" }} />
              </View>
            </View>
          </View>

      </View>
    </SafeAreaView>
  );
}
