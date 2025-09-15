import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";

interface props {
  children?: React.ReactNode,
  textHolder?: string;
  visible?: boolean;
  onChangeText: (text: string | undefined | null) => void;
  title?: string
  label?: string;
  showError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function Forminput({children, textHolder, visible, onChangeText, label, title, showError = false, required = true, disabled = false}: props){
  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined | null>(undefined);

  // Notifica o componente pai quando montado e quando required/disabled mudarem, apenas se estiver vazio
  useEffect(() => {
    const isEmpty = value === undefined || value === null || value === '';
    if (isEmpty) {
      onChangeText?.(required ? undefined : null);
    }
  }, [required, disabled, value]);

  const handleChangeText = (text: string) => {
    if (disabled) return;
    setLocalError(false); 
    if(text === ""){
      if(required){
        setValue(undefined);
        onChangeText(undefined);
      } else {
        setValue(null);
        onChangeText(null);
      }
    } else {
      setValue(text);
      onChangeText(text);
    }
  };

  useEffect(() => {
    if (disabled) {
      setLocalError(false);
      return;
    }
    if (showError && required && value === undefined) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, value, required, disabled]); 

  return (
    <View className={`w-full ${disabled && 'opacity-60' }`}>
      {title && (
        <Text className={`w-full text-xl font-semibold mt-3 ${localError || label ? "" : "pb-2"}`}>{title}</Text>
      )}
      {localError && <Text className={`${label? "" : "pb-2"} text-red-500 font-sans text-sm mt-0.5`}>Este campo é obrigatório.</Text>}
            {label && <Text className="font-sans text-gray-900/70 text-md pb-2 ">{label}</Text>}
      <View className="flex items-center justify-between flex-row w-full h-10 mb-4  bg-[#EFEFEF] border border-gray-900/30 rounded-md shadow-lg">
        <TextInput 
          value={value || ""}
          onChangeText={handleChangeText}
          secureTextEntry={visible}
          editable={!disabled}
          className={`flex-1 px-2 mt-0.5 text-black text-lg font-semibold ${disabled ? 'opacity-60' : ''}`}
          placeholder = {textHolder}
          placeholderTextColor={"#9F9F9F"}
        />
        {children && (
            <View className="items-center justify-center">
              {children}
            </View>
          )}
      </View>
    </View>
  );
}