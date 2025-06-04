import React, { useState } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import images from "../constants/images";

interface DropdownProps extends React.ComponentPropsWithoutRef<typeof View> {
  title: string;
  tag?: string;
  tipoOcorrencia: string;
  onPress: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, onPress, tag, tipoOcorrencia, ...props }) => {
  const [isSelected, setIsSelected] = useState(false);
  const tags = tag?.split(",") || [];

  return (
    <View {...props} className="bg-[#57714A] rounded-sm w-full flex flex-col items-center">
      <Pressable className="pt-3 pb-5 px-5 flex flex-col" onPress={() => {
        setIsSelected(!isSelected);
      }}>
        <View className="flex flex-row items-center justify-between w-full gap-1">
          <Text numberOfLines={1} className="text-white font-semibold text-xl flex-1">{title}</Text>
          <Image
            source={images.arrow}
            className={`w-6 h-6  ${isSelected ? "rotate-180 " : ""}`}
            resizeMode="contain"
          />
        </View>
        {tags[0] && (
          <View className="bg-[#DFDFDF] rounded-md px-3 py-1 mt-4 flex flex-col border-x-hairline border-b-2 border-gray-900/30">
            {tags.map((tag, index) => (
              <View className="flex flex-row items-center gap-1" key={index}>
                <Image
                  source={images.pin}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
                <Text key={index} className="text-black italic text-lg">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
      {isSelected && (
        <View className="flex flex-col p-4 pt-1">
          <Text className="text-white font-semibold text-lg">Natureza do Dano (Infração/Crime)</Text>
          <View className="bg-[#DFDFDF] rounded-md p-3 mt-4 flex flex-col border-x-hairline border-b-2 border-gray-900/30">
            <Text className="text-black text-md">{tipoOcorrencia}</Text>
          </View>
          <TouchableOpacity className="bg-[#DFDFDF] rounded-xl p-1 mt-6 flex flex-row justify-center border-x-hairline border-b-2 border-gray-900/30">
            <Text className="text-black font-medium text-xl text-center">Selecionar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Dropdown;