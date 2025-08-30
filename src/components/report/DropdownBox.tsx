import images from '@/src/constants/images';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface DropdownBoxProps {
    title?: string;
    options: string[];
    onSelect?: (option: string | undefined) => void;
    required?: boolean; // Adiciona a propriedade "required"
    error?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, onSelect, required = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [error, setError] = useState(false); // Estado para controlar o erro

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        setError(false); // Limpa o erro ao selecionar uma opção
    };


    useEffect(() => {

        onSelect?.(selected); // Chama o callback sempre que "selected" mudar
    }, [selected]); // Dependência no "selected"


    const handleRequired = () => {
        if (required && !selected ) {
            setError(true); 
            return;
        }
        setIsOpen((open) => !open);
    };

    return (

        <View className="w-52">

            {title&&
                <Text className='font-semibold text-xl ml-1 mb-2'>{title}</Text>
            }
            {/* Botão de abrir/fechar */}
            <Pressable
                className={`bg-[#EFEFEF] border border-gray-900/30 rounded-md ${isOpen&& " rounded-b-none"}`}
                onPress={() => setIsOpen(!isOpen)}
            >
                <View className={`flex-row items-center `}>
                    <Text className="flex-1 font-sans text-lg py-2 pl-3">
                        {selected || "Selecione"}
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

            {/* Mensagem de erro */}
            {error && <Text className="text-red-500 text-sm mt-1">Selecione uma opção antes de continuar.</Text>}
        </View>
    );
};

export default DropdownBox;