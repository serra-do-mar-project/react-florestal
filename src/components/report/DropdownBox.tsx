import images from '@/src/constants/images';
import { cn } from '@/src/lib/utils';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DropdownOption {
    valor: string;
    nome: string;
}

interface DropdownBoxProps {
    title?: string;
    options: (string | DropdownOption)[];
    onSelect?: (option: string | undefined | null) => void;
    required?: boolean;
    showError?: boolean;
    disabled?: boolean;
    className?: string;
    optionsClassName?: string;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, onSelect, required = true, showError = false, disabled = false, className, optionsClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | undefined | null>(undefined);
    const [selectedDisplay, setSelectedDisplay] = useState<string | undefined | null>(undefined);
    const [localError, setLocalError] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined);

    // Função auxiliar para obter valor e nome de uma opção
    const getOptionValue = (option: string | DropdownOption): string => {
        return typeof option === 'string' ? option : option.valor;
    };

    const getOptionDisplay = (option: string | DropdownOption): string => {
        return typeof option === 'string' ? option : option.nome;
    };

    const handleSelect = (option: string | DropdownOption) => {
        const value = getOptionValue(option);
        const display = getOptionDisplay(option);

        setSelected(value);
        setSelectedDisplay(display);
        setIsOpen(false);
        setLocalError(false);
        if (onSelect) onSelect(value);
    };

    // Limpa seleção se usuário clicar novamente na opção já selecionada
    const handleClear = () => {
        if (required) {
            setSelected(undefined);
            setSelectedDisplay(undefined);
            if (onSelect) onSelect(undefined);
        } else {
            setSelected(null);
            setSelectedDisplay(null);
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

        <View 
            className="self-start min-w-60 max-w-80 mb-4"
            style={dropdownWidth ? { width: dropdownWidth } : undefined}
        >

            {title &&
                <View className={` ${disabled ? 'opacity-60' : ''}`}>
                    <Text className={`font-semibold text-xl ml-0.5 mt-2 ${localError ? "" : "mb-3"}`}>{title}</Text>
                    {(localError) && <Text className="text-red-500 font-sans text-sm ml-0.5 mb-3">Selecione uma opção antes de continuar.</Text>}
                </View>
            }

            {/* Botão de abrir/fechar */}
            <Pressable
                className={cn(`bg-[#EFEFEF] border border-gray-900/30 rounded-md ${isOpen && "rounded-b-none"} ${disabled ? 'opacity-60' : ''} active:opacity-80`, className)}
                onPress={() => !disabled && setIsOpen(!isOpen)}
                onLongPress={!disabled && selected ? handleClear : undefined}
            >
                <View className={`flex-row items-center min-w-fit`}>
                    <Text
                        className="flex-1 font-sans text-xl py-2 pl-3 pr-1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {selectedDisplay || "Selecione"}
                    </Text>
                    <View className={cn('border-l h-full border-gray-900/30', className)}>
                        <View className='flex-1 justify-center'>
                            <Image
                                source={images.arrow}
                                className="w-4 h-4 mx-3"
                                style={{ 
                                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }]
                                }}
                                resizeMode="contain"
                                tintColor="black"
                            />
                        </View>
                    </View>
                </View>
            </Pressable>

            {/* Lista de opções */}
            {isOpen && (
                <View 
                    className={cn("bg-[#EFEFEF] border border-t-0 border-gray-900/30 rounded-b-md", optionsClassName)}
                    onLayout={(event) => {
                        if (!dropdownWidth) {
                            const { width } = event.nativeEvent.layout;
                            setDropdownWidth(width);
                        }
                    }}
                >
                    {options.map((option, idx) => (
                        <Pressable
                            key={getOptionValue(option)}
                            onPress={() => handleSelect(option)}
                        >
                            {({ pressed }) => (
                                <View className={`${pressed ? "bg-gray-300" : ""} ${idx === options.length - 1 && required ? "rounded-b-md" : ""}`}>
                                    <Text className="font-sans text-lg py-2 px-3">
                                        {getOptionDisplay(option)}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                    {/* Botão para limpar seleção, se não for required */}
                    {!required && (
                        <Pressable onPress={handleClear}>
                            {({ pressed }) => (
                                <View className={`${pressed ? "bg-red-50" : ""} rounded-b-md`}>
                                    <Text className="font-sans text-red-500 text-md py-2 pl-3">
                                        Limpar seleção
                                    </Text>
                                </View>
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