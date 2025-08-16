import images from '@/src/constants/images';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';



interface DropdownBoxProps {
    label?: string; 
    onPress?: () => void;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ label, onPress,}) => {
    
    const [isSelected, setIsSelected] = useState(false);
    
  return (
    <TouchableOpacity 
        className="flex-row bg-[#EFEFEF] border border-gray-900/50 rounded-md"
        onPress={() => setIsSelected(!isSelected)}
    >
                  <View className="w-32 py-1.5 pl-3 pr-1 justify-center">
                    <Text>Opção</Text>
                  </View>
                  

                  <View className="border-l border-gray-900/50 justify-center px-1.5 ">
                  <Image
                      source={images.arrow}
                      className={`w-4 h-4 transition-transform duration-100 ${isSelected? "rotate-180 " : ""} `}
                      resizeMode="contain"
                      tintColor='black'
                  />
                  </View>
              </TouchableOpacity>
    );
};

export default DropdownBox;