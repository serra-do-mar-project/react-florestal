import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/src/constants/images";
import { Image } from "expo-image";

interface CardUserProps {
  nome: string;
  tipo: string;
  onOptionsPress?: () => void;
  isFirst?: boolean; // Adicione esta prop
}

export default function CardUser({ nome, tipo, onOptionsPress, isFirst }: CardUserProps) {
  return (
    <View
      className={`h-24 mx-3 my-2 flex-row items-center justify-between bg-white border border-gray-900/20 rounded-xl`}
    >
      <View className="px-6 pb-1">
        <Text className="text-xl font-semibold">{nome}</Text>
        <Text className="text-lg font-sans ml-0.5">{tipo}</Text>
      </View>
      <TouchableOpacity
        className="h-full px-6 pb-1 justify-center"
        onPress={onOptionsPress}
      >
        <Image
          source={images.opcoes}
          style={{ width: 20, height: 20 }}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
}