import images from '@/src/constants/images';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DropdownBoxProps {
    title?: string;
    options: string[];
    onSelect?: (option: string | undefined) => void;
    required?: boolean; 
    showError?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, onSelect, required = true, showError = false}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [localError, setLocalError] = useState(false); // Estado local para controlar o erro

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        setLocalError(false); 
    };


    useEffect(() => {
        onSelect?.(selected); 
    }, [selected]); 


    useEffect(() => {
        if (showError && !selected) {
            setLocalError(true);
        }
    }, [showError]); 


    return (
        
        <SafeAreaView className="w-48 mb-5">

            {title&&
                <>
                    <Text className={`font-semibold text-xl ml-0.5 ${localError? "" : "mb-3"}`}>{title}</Text>
                    {(localError) && <Text className="text-red-500 font-sans text-sm ml-0.5 mb-3">Selecione uma opção antes de continuar.</Text>}
                </>
                
            }
            
            {/* Botão de abrir/fechar */}
            <Pressable
                className={`bg-[#EFEFEF] border border-gray-900/30 rounded-md ${isOpen&& "rounded-b-none"}`}
                onPress={() => setIsOpen(!isOpen)}
            >
                <View className={`flex-row items-center`}>
                    <Text className="flex-1 font-sans text-lg py-2 pl-3">
                        {selected || "Selecione"}
                    </Text>
                    <View className='border-l h-full border-gray-900/30'>
                        <View className='flex-1 justify-center'>
                            <Image
                                source={images.arrow}
                                className={`w-4 h-4 mx-3 transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
                                resizeMode="contain"
                                tintColor="black"
                            />
                        </View>
                    </View>
                </View>
            </Pressable>

            {/* Lista de opções */}
            {isOpen && (
                <View className="bg-[#EFEFEF] w-48 border border-t-0 border-gray-900/30 rounded-b-md">
                    {options.map((option, idx) => (
                        <Pressable
                            key={option}
                            onPress={() => handleSelect(option)}
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

            {(localError && !title) && <Text className="text-red-500 font-sans text-sm ml-0.5 mb-3">Selecione uma opção antes de continuar.</Text>}
            
        </SafeAreaView>
    );
};

export default DropdownBox;