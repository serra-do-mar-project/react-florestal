import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Animated,
  {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    withTiming,
    interpolateColor,
  } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Title from "@/src/components/Title";
import Dropdown from "@/src/components/Dropdown";
import images from "@/src/constants/images";
import db from '../../db/connection';
import { Infracao, infracoesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const IMAGE_HEIGHT = 270;
const MIN_IMAGE_HEIGHT = 80;
const PANEL_OFFSET = 40;

export default function AuthLayout() {
  const router = useRouter();
  const dragY = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<Infracao[] | undefined>()
  const [pBottom, setPBottom] = useState(350)

  useEffect(() => {
    if(isOpen) setPBottom(200)
    else setPBottom(350)
  }, [isOpen])

  // animação do conteudo
  const contentAnimatedStyle = useAnimatedStyle(() => {
    const paddingTop = interpolate(
      dragY.value,
      [0, 150],
      [IMAGE_HEIGHT + 40, 150],
      Extrapolation.CLAMP
    );

    return {
      paddingTop
    };
  })

  // Atualiza dragY animado quando o estado muda
  React.useEffect(() => {
    dragY.value = withTiming(isOpen ? 150 : 0, { duration: 300 });
  }, [isOpen]);

  // Animação da imagem
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      dragY.value,
      [0, 130],
      [IMAGE_HEIGHT, MIN_IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );
    return { height };
  });

  // Animação do painel
  const panelAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(
      dragY.value,
      [0, 150],
      [IMAGE_HEIGHT - PANEL_OFFSET, 0],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      dragY.value,
      [100, 100],
      [1, 0.97],
      Extrapolation.CLAMP
    );
    const paddingTop = interpolate(
      dragY.value,
      [0, 150],
      [20, 50],
      Extrapolation.CLAMP
    );
    
    const backgroundColor = interpolateColor(
      dragY.value,
      [0, 150],
      ['#F6F5F5', '#EFEFEF']
    );
  
    return {
      top,
      opacity,
      paddingTop,
      backgroundColor,
    };
  });

  const getData = async () => {
    const infracoesData = await db.select()
    .from(infracoesTable)
    .where(eq(infracoesTable.categoria, "fauna"))
    setData(infracoesData as Infracao[])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View className="flex-1 bg-gray-200 relative">
      {/* Imagem animada */}
      <Animated.View
        style={imageAnimatedStyle}
        className="w-full absolute top-0 left-0 z-10"
      >
        <Image
          source={images.fauna}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        <View className="absolute top-9 w-full flex-row items-center justify-between z-20"> 
             <TouchableOpacity
            className="bg-white/60 w-12 h-12 flex justify-center items-center rounded-br-lg rounded-tr-lg p-2"
            onPress={() => router.push("/auth/searchPage")}
          >
            <images.leftArrow width={30} height={30} style={{ resizeMode: "contain", opacity: 0.8  }} />
          </TouchableOpacity>
          
           <View
            className=" bg-white/60 h-12 flex justify-center items-center rounded-bl-lg rounded-tl-lg px-4 py-2 z-20"
          >
            <Text className="text-gray-900/100 text-2xl font-bold">Fauna</Text>
          </View>
        </View>
      </Animated.View>

      {/* Painel animado com clique para alternar */}
      <Animated.View
        style={panelAnimatedStyle}
        className="w-full absolute left-0 right-0 rounded-t-3xl pb-3 z-20 bg-black"
        onTouchEnd={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 
          <View className="w-full flex-row items-center justify-between mb-3 px-8 ">
            <TouchableOpacity
              className="flex justify-center items-center rounded-br-lg rounded-tr-lg"
              onPress={() => router.push("/auth/searchPage")}
            >
              <images.leftArrow width={30} height={30} style={{ resizeMode: "contain", opacity: 0.9  }} />
            </TouchableOpacity>

            <View
              className=" bg-green-500/30 h-12 flex justify-center items-center rounded-full px-4 py-2 z-20"
            >
              <Text className="text-gray-900/100 text-xl font-bold">Fauna</Text>
            </View>
          </View>
          :
          <></>
        }
      
        {!isOpen && <View className="h-2 w-12 bg-gray-400 rounded-full mx-auto mb-3"/>}
        <View className="ml-9"><Title>Exemplos de casos</Title></View>
      </Animated.View>

      {/* Lista de Dropdowns */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={contentAnimatedStyle}
        contentContainerStyle={{
          paddingBottom: pBottom,
          alignItems: "center",
        }}
        className="bg-gray-200"
      >
        <Animated.View className="w-full px-8 gap-4">
          {data && data.map((item, index) => (
            <Dropdown
              key={index}
              title={item.nome_resumo}
              tag={item.tags}
              tipoOcorrencia={item.tipo_ocorrencia}
              onPress={() => router.push("/auth/fauna")}
            />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}
