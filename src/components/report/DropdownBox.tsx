import images from '@/src/constants/images';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DropdownBoxProps {
    title?: string;
    options: string[];
    onSelect?: (option: string | undefined | null) => void;
    required?: boolean; 
    showError?: boolean;
    disabled?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, onSelect, required = true, showError = false, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | undefined | null>(undefined);
    const [localError, setLocalError] = useState(false); // Estado local para controlar o erro

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        setLocalError(false); 
        if (onSelect) onSelect(option);
    };

    // Limpa seleção se usuário clicar novamente na opção já selecionada
    const handleClear = () => {
        if (required) {
            setSelected(undefined);
            if (onSelect) onSelect(undefined);
        } else {
            setSelected(null);
            if (onSelect) onSelect(null);
        }
        setIsOpen(false);
        setLocalError(false);
    };

    useEffect(() => {
        // Notifica o pai ao montar
        onSelect?.(required ? undefined : null);
    }, []);

    useEffect(() => {
        if (disabled && !prevDisabled) {
            onSelect?.(null);
        } else {
            if (selected === undefined || selected === null || selected === '') {
                onSelect?.(required ? undefined : null);
            } else {
                onSelect?.(selected);
            }
        }
        setPrevDisabled(!!disabled);
    }, [required, disabled, selected]);

    useEffect(() => {
        if (showError && required && selected === undefined) {
            setLocalError(true);
        } else {
            setLocalError(false);
        }
    }, [showError, selected, required]);

    return (
        
        <View className="w-60 mb-5">

            {title&&
                <View className={` ${disabled ? 'opacity-60' : ''}` }>
                    <Text className={`font-semibold text-xl ml-0.5 mt-3 ${localError? "" : "mb-3"}`}>{title}</Text>
                    {(localError) && <Text className="text-red-500 font-sans text-sm ml-0.5 mb-3">Selecione uma opção antes de continuar.</Text>}
                </View>
            }
            
            {/* Botão de abrir/fechar */}
            <Pressable
                className={`bg-[#EFEFEF] border border-gray-900/30 rounded-md ${isOpen&& "rounded-b-none"} ${disabled ? 'opacity-60' : ''}`}
                onPress={() => !disabled && setIsOpen(!isOpen)}
                onLongPress={!disabled && selected ? handleClear : undefined}
            >
                <View className={`flex-row items-center`}>
                    <Text className="flex-1 font-sans text-lg py-2 pl-3 pr-1">
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
                <View className="bg-[#EFEFEF] w-60 border border-t-0 border-gray-900/30 rounded-b-md">
                    {options.map((option, idx) => (
                        <Pressable
                            key={option}
                            onPress={() => handleSelect(option)}
                        >
                            {({ pressed }) => (
                                <Text
                                    className={`font-sans text-md py-1 pl-3 
                                        ${pressed ? "bg-gray-300" : ""}  
                                        ${idx === options.length - 1  && required? "rounded-b-md" : ""}
                                    `}
                                >
                                    {option}
                                </Text>
                            )}
                        </Pressable>
                    ))}
                    {/* Botão para limpar seleção, se não for required */}
                    {!required && (
                        <Pressable onPress={handleClear}  className="">
                            {({ pressed }) => (
                                <Text
                                    className={`font-sans text-red-500 text-md py-1 pl-3 rounded-b-md
                                                ${pressed ? "bg-gray-300" : ""}  
                                              `}
                                >
                                Limpar seleção
                                </Text>
                            )}
                        </Pressable>
                    )}
                </View>
            )}
            {(localError && !title) && <Text className="text-red-500 font-sans text-sm ml-0.5 mb-3">Selecione uma opção antes de continuar.</Text>}
        </View>
    );
};

export default DropdownBox;