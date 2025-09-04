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
}

export function Forminput({children, textHolder, visible, onChangeText, label, title, showError = false, required = true}: props){
  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined | null>(undefined);

  // Notifica o componente pai quando montado
  useEffect(() => {
    onChangeText?.(required ? undefined : null);
  }, []);

  const handleChangeText = (text: string) => {
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
    if (showError && required && value === undefined) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, value, required]); 

  return (
    <View className="w-full">
      {title && (
        <Text className={`w-full text-xl font-semibold mt-3 ${localError || label ? "" : "pb-2"}`}>{title}</Text>
      )}
      {localError && <Text className={`${label? "" : "pb-2"} text-red-500 font-sans text-sm mt-0.5`}>Este campo é obrigatório.</Text>}
            {label && <Text className="text-gray-800 font-sans text-md pb-2 ">{label}</Text>}
      <View className="flex items-center justify-between flex-row w-full h-10 mb-4  bg-[#EFEFEF] border border-gray-900/30 rounded-md shadow-lg">
        <TextInput 
          value={value || ""}
          onChangeText={handleChangeText}
          secureTextEntry={visible}
          className="flex-1 px-2 mt-0.5 text-black text-lg font-semibold"
          placeholder = {textHolder}
        />
        {children && (
            <View className="flex-2 items-center justify-center">
              {children}
            </View>
          )}
      </View>
    </View>
  );
}