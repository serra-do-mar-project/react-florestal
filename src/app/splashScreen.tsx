'use client'

import { View, Image, Text } from "react-native";
import images from "../constants/images";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "expo-router";

export default function loginPage() {

  const router = useRouter();

  return (
    <View className="flex-1">
    <Image
        source={images.splashbg}
        className="absolute w-full h-full"
        resizeMode="cover"
    />
    <View className="z-10 flex-1 items-center">
        <View className="mt-7">
          <images.logoparque width={300} height={120} />
        </View>
        <View className="flex-1 w-full mt-28 justify-end items-center ml-3.5">
            <Text
                className="absolute text-5xl font-bold text-black"
                style={{
                    textShadowColor: '#45503F',
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 2,
                    letterSpacing: 1,
                    lineHeight: 52, // ajuste conforme desejar
                }}
            >
                Manual de{"\n"}
                Procedimentos{"\n"}
                Operacionais e{"\n"}
                Administrativos
            </Text>
            <Text
                className="text-white text-5xl font-bold"
                style={{ letterSpacing: 1, lineHeight: 52 }} // mesmo valor do texto de trás
            >
                Manual de{"\n"}
                Procedimentos{"\n"}
                Operacionais e{"\n"}
                Administrativos
            </Text>
        </View>
        <View className="mt-20">
            <SubmitButton title="Entrar" onPress={() => router.push("/loginPage")}/>
        </View>
        <View className="flex-1 w-full flex-row items-end justify-around mx-5 ">
             <images.ifsplogo width={90} height={90} />
             <images.fundacaoFlorestalBranca width={110} height={110} />
             <images.splogoBranca alt="imagem da logo de são paulo não ofcial" width={90} height={90} />
        </View>
    </View>
</View>
  );
}
