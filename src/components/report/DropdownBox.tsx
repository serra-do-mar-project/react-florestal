import images from '@/src/constants/images';
import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface DropdownBoxProps {
    title?: string;
    options: string[];
    onSelect?: (option: string) => void;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (

        <View className="w-52">

            {title&&
                <Text className='font-semibold text-xl ml-1 mb-2'>{title}</Text>
            }
            {/* Botão de abrir/fechar */}
            <Pressable
                className={`bg-[#EFEFEF] border border-gray-900/30 rounded-md ${isOpen&& " rounded-b-none"}`}
                onPress={() => setIsOpen((open) => !open)}
            >
                <View className={`flex-row items-center `}>
                    <Text className="flex-1 font-sans text-lg py-2 pl-3">
                        {selected  || "Selecione"}
                    </Text>
                    <Image
                        source={images.arrow}
                        className={`w-4 h-4 mx-2 transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
                        resizeMode="contain"
                        tintColor="black"
                    />
                </View>
            </Pressable>

            {/* Lista de opções */}
            {isOpen && (
                <View className="bg-[#EFEFEF] border border-t-0 border-gray-900/30 rounded-b-md">
                    {options.map((option, idx) => (
                        <Pressable
                            key={option}
                            onPress={() => {
                                setSelected(option);
                                setIsOpen(false);
                                onSelect?.(option);
                            }}
                        >
                            {({ pressed }) => (
                                <Text
                                    className={`font-sans text-md py-1 pl-3 
                                        ${pressed ? "bg-gray-300" : ""}  
                                        ${idx === options.length - 1 ? "rounded-b-md" : ""}
                                    `}
                                >
                                    {option}
                                </Text>
                            )}
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DropdownBox;