// components/ReusablePageLayout.tsx

import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
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
import { FlatList } from "react-native-gesture-handler";

const IMAGE_HEIGHT = 270;
const MIN_IMAGE_HEIGHT = 80;
const PANEL_OFFSET = 50;

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
  const scrollY = useSharedValue(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const buttonsOpacity = useSharedValue(1);
  
  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [
      { translateY: interpolate(buttonsOpacity.value, [1, 0], [0, -20], Extrapolation.CLAMP) }
    ]
  }));
  
  return (
    <View className="flex-1 bg-gray-200">
      {/* Imagem fixa no fundo */}
      <View className="absolute top-0 left-0 right-0 h-72 overflow-hidden" pointerEvents="none">
        {imageComponent}
      </View>
      
      {/* Botões com animação */}
      {buttonsVisible && (
        <Animated.View 
          style={buttonsAnimatedStyle} 
          className="absolute top-9 w-full flex-row items-center justify-between z-20"
        >
          <TouchableOpacity
            className="bg-white/90 h-12 justify-center items-center rounded-br-lg rounded-tr-lg px-4"
            onPress={() => router.push("/auth/search")}
          >
            <Image source={images.leftArrow} style={{ width: 30, height: 30, opacity: 0.8 }} contentFit="contain" />
          </TouchableOpacity>
          <View className="bg-white/90 h-12 max-w-72 justify-center items-center rounded-bl-lg rounded-tl-lg px-4">
            <Text className="text-gray-900/80 text-2xl font-BaiJamJuree_bold" numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={1}>
              {title}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* FlatList que scrolla sobre a imagem */}
      <FlatList
        onScroll={(e) => {
          const offset = e.nativeEvent.contentOffset.y;
          scrollY.value = offset;
          buttonsOpacity.value = withTiming(offset < 50 ? 1 : 0, { duration: 400 });
          setButtonsVisible(offset < 50);
        }}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 220, paddingBottom: 20 }}
        
        ListHeaderComponent={
          <View className="w-full bg-gray-200 rounded-t-3xl pb-10 pt-6">
            <View className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mb-5" />
            <View className="ml-8 ">
              <Title>Exemplos de casos</Title>
            </View>
          </View>
        }
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="px-5 pb-4 bg-gray-200">
            <Dropdown
              title={item.nome_resumo}
              tag={item.tags}
              tipoOcorrencia={item.tipo_ocorrencia}
              onPress={() => onDropdownPress(item)}
            />
          </View>
        )}
      />
    </View>
  );
}