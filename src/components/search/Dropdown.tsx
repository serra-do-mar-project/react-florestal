import React, { useState } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import images from "@/src/constants/images";

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
    <View {...props} className="bg-[#57714A] rounded-md w-full flex flex-col items-center">
      <Pressable className={`pt-3 pb-5 px-5 flex flex-col`} onPress={() => {
        setIsSelected(!isSelected);
      }}>
        <View className="flex flex-row items-start justify-between w-full gap-1">
          <Text numberOfLines={!isSelected? 1 : 2} adjustsFontSizeToFit={isSelected&& true} className="text-white font-semibold flex-1" style={{ fontSize: 20 }}>{title}</Text>
          <Image
            source={images.arrow}
            className={`w-6 h-6 mt-2 ${isSelected ? "rotate-180 " : ""}`}
            resizeMode="contain"
          />
        </View>
        {tags[0] && (
          <View className="bg-[#DFDFDF] rounded-md px-3 pt-1 pb-1.5 mt-4 flex flex-col border-x-hairline border-b-2 border-gray-900/30">
            {tags.map((tag, index) => (
              <View className="flex-row items-center gap-1" key={index}>
                <Image
                  source={images.pin}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
                <Text key={index} className="text-black font-BaiJamJuree_Medium">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
      {isSelected && (
        <View className="flex flex-col pb-4 px-5 w-full">
          
          <View className="bg-[#DFDFDF] rounded-md pb-3 px-3 pt-2 flex flex-col border-x-hairline border-b-2 border-gray-900/30">
            <Text className="font-semibold text-lg">Natureza do Dano (Infração/Crime)</Text>
            <Text className="text-black font-BaiJamJuree_Medium text-md">{tipoOcorrencia}</Text>
          </View>
          <TouchableOpacity
            className="bg-[#DFDFDF] rounded-xl p-1 mb-1 mt-6  w-full flex-row justify-center border-x-hairline border-b-2 border-gray-900/30"
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text className="text-black font-BaiJamJuree_Medium text-xl text-center py-0.5">Selecionar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Dropdown;