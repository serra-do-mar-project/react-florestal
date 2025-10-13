import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface CardProps {
  text: string;
  onPress: () => void;
  src?: any;
}

export function Card({ text, onPress, src }: CardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-gray-900/30 shadow-md"
    >
      <View className="h-32">
        <Image
              source={src}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            
        />
      </View>

      <View className="flex-1 items-center pt-2 border-t border-gray-900/40 ">
        <Text className="text-xl font-semibold">{text}</Text>
      </View>
    </TouchableOpacity>
  );
}