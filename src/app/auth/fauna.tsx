import React, { useState } from "react";
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

const IMAGE_HEIGHT = 270;
const MIN_IMAGE_HEIGHT = 80;
const PANEL_OFFSET = 40;

export default function AuthLayout() {
  const router = useRouter();
  const dragY = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

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
      [20, 75],
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

  const data = [
    { title: "Captura de Animais Silvestres" },
    { title: "Comércio ilegal de fauna" },
    { title: "Introdução de espécies exóticas" },
    { title: "Maus-tratos a animais" },
    { title: "Poluição de ambientes naturais" },
    { title: "Abate Ilegal de Animais Silvestres" },
    { title: "Captura de Animais Silvestres" },
    { title: "Comércio ilegal de fauna" },
    { title: "Introdução de espécies exóticas" },
    { title: "Maus-tratos a animais" },
    { title: "Poluição de ambientes naturais" },
    { title: "Abate Ilegal de Animais Silvestres" },
  ];

  return (
    <View className="flex-1 bg-gray-200">
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
        className="w-full absolute left-0 right-0 rounded-t-3xl pb-7 -mt-10 z-20"
        onTouchEnd={() => setIsOpen((prev) => !prev)}
      >
        
         {isOpen ? 
          
          <View className="w-full flex-row items-center justify-between mb-3 px-8">
            <TouchableOpacity
            className="flex justify-center items-center rounded-br-lg rounded-tr-lg"
            onPress={() => router.push("/auth/searchPage")}
          >
            <images.leftArrow width={30} height={30} style={{ resizeMode: "contain", opacity: 0.9  }} />
          </TouchableOpacity>

           <View
            className=" bg-green-500/30 h-12 flex justify-center items-center rounded-full m- px-4 py-2 z-20"
          >
            <Text className="text-gray-900/100 text-xl font-bold">Fauna</Text>
          </View>
          
          </View>

          :
          <></>
      }
      
      <View className="ml-9"><Title>Exemplos de casos</Title></View>
      </Animated.View>

      {/* Lista de Dropdowns */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: IMAGE_HEIGHT + 20,
          paddingBottom: 40,
          alignItems: "center",
        }}
        className="bg-gray-200"
      >
        <View className="w-full px-8 gap-4">
          {data.map((item, index) => (
            <Dropdown
              key={index}
              title={item.title}
              tag="hi,hello"
              onPress={() => router.push("/auth/fauna")}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
