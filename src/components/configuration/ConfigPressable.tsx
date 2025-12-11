import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import images from "@/src/constants/images";
import { useState } from "react";

export interface ConfigPressableProps {
  onPress: () => void;
  title: string;
  icon?: string;
  iconSize?: number;
}

const ConfigPressable = ({onPress, title, icon, iconSize = 18} : ConfigPressableProps) => {
  
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    <Pressable 
      className={`w-full items-center justify-between flex-row pt-5 px-5 pb-5 border-b border-gray-900/20 ${isSelected ? " bg-gray-300" : ""}`} 
      onPress={() => {onPress}} 
      onPressIn={() => setIsSelected(true)}
      onPressOut={() => setIsSelected(false)}
    >
              <Text className="text-2xl font-semibold text-gray-900 " >{title}</Text>
              <Image
                source={icon}
                style={{ 
                  width: iconSize, 
                  height: iconSize,
                }}
                contentFit="contain"
                tintColor="black"
              />
            </Pressable>
  );

}

export default ConfigPressable;