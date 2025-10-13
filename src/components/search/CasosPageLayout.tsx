// components/ReusablePageLayout.tsx

import { View, Text, TouchableOpacity, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  interpolateColor,
  Extrapolation,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/src/components/Title";
import Dropdown from "@/src/components/search/Dropdown";
import images from "../../constants/images";

const IMAGE_HEIGHT = 270;
const MIN_IMAGE_HEIGHT = 80;
const PANEL_OFFSET = 40;

export default function ReusablePageLayout({
  imageComponent,
  title,
  data,
  onDropdownPress
}: {
  imageComponent: React.ReactNode;
  title: string;
  data: any[];
  onDropdownPress: (item: any) => void;
}) {
  const router = useRouter();
  const dragY = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pBottom, setPBottom] = useState(350);

  useEffect(() => {
    setPBottom(isOpen ? 160 : 320);
    dragY.value = withTiming(isOpen ? 150 : 0, { duration: 300 });
  }, [isOpen]);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(
      dragY.value,
      [0, 150],
      [IMAGE_HEIGHT + 20, 130],
      Extrapolation.CLAMP
    ),
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      dragY.value,
      [0, 130],
      [IMAGE_HEIGHT, MIN_IMAGE_HEIGHT],
      Extrapolation.CLAMP
    ),
  }));

  const panelAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(dragY.value, [0, 150], [IMAGE_HEIGHT - PANEL_OFFSET, 0]),
    opacity: interpolate(dragY.value, [100, 100], [1, 0.97]),
    paddingTop: interpolate(dragY.value, [0, 150], [20, 50]),
    backgroundColor: interpolateColor(
      dragY.value,
      [0, 150],
      ['#F6F5F5', '#ECECEC']
    ),
  }));

  return (
    <SafeAreaView className="flex-1 bg-gray-200 relative">
      {/* Header com Imagem */}
      <Animated.View
        style={imageAnimatedStyle}
        className="w-full absolute top-0 left-0 z-10"
      >
        {/* Agora recebe o componente de imagem como children */}
        {imageComponent}
        <View className={`absolute top-9 w-full flex-row items-center justify-between z-20 ${isOpen ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in-out`}>
          <TouchableOpacity
            className="bg-white/70 h-12 justify-center items-center rounded-br-lg rounded-tr-lg px-4"
            onPress={() => router.push("/auth/search")}
          >
            <images.leftArrow width={30} height={30} style={{ resizeMode: "contain", opacity: 0.8  }} />
          </TouchableOpacity>
          <View className="bg-white/70 h-12 justify-center items-center rounded-bl-lg rounded-tl-lg px-4">
            <Text className="text-gray-900/80 text-2xl font-bold">{title}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Painel */}
      <Animated.View
        style={panelAnimatedStyle}
        className="w-full absolute left-0 right-0 rounded-t-3xl pb-5 -mt-5 z-20"
        onTouchEnd={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? (
          <View>
            <View className="w-full flex-row justify-between mb-3 px-6">
              <TouchableOpacity onPress={() => router.push("/auth/search")}>
                <images.leftArrow width={30} height={30} style={{ resizeMode: "contain", opacity: 0.9  }} />
              </TouchableOpacity>
              <View className="bg-green-500/30 px-3.5 py-1.5 rounded-full">
                <Text className="text-gray-900 text-xl font-bold">{title}</Text>
              </View>
            </View>
            <View className="ml-7"><Title>Exemplos de casos</Title></View>
          </View>
        ) : (
          <View>
            <View className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto -mt-2.5 mb-5" />
            <View className="ml-8"><Title>Exemplos de casos</Title></View>
          </View>
        )}
      </Animated.View>

      {/* Conteúdo */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={contentAnimatedStyle}
        contentContainerStyle={{
          paddingBottom: pBottom,
          alignItems: "center",
        }}
        className="bg-gray-200"
      >
        <View className="w-full px-8 gap-4">
          {data.map((item, index) => (
            <Dropdown
              key={index}
              title={item.nome_resumo}
              tag={item.tags}
              tipoOcorrencia={item.tipo_ocorrencia}
              onPress={() => onDropdownPress(item)}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}