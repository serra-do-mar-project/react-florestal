import React from "react";
import { View, Text, Pressable, Image } from "react-native";

interface CardProps {
  text: string;
  onPress: () => void;
  src?: any;
}

export function Card({ text, onPress, src }: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-green-100 shadow-md"
    >
      <View className="h-32">
        <Image
              source={src}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            
        />
      </View>

      <View className="flex items-center pt-2">
        <Text className="text-xl font-medium">{text}</Text>
      </View>
    </Pressable>
  );
}