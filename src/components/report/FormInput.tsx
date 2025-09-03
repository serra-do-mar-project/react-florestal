import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";

interface props {
  children?: React.ReactNode,
  textHolder?: string;
  visible?: boolean;
  onChangeText: (text: string | undefined) => void;
  label?: string;
  showError?: boolean;
}

export function Forminput({children, textHolder, visible, onChangeText, label, showError = false}: props){
  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

  // Notifica o componente pai quando montado com valor undefined
  useEffect(() => {
    onChangeText?.(undefined);
  }, []);

  const handleChangeText = (text: string) => {
    setLocalError(false); 
    if(text === ""){
      setValue(undefined);
      onChangeText(undefined);
    } else {
      setValue(text);
      onChangeText(text);
    }
  };

  useEffect(() => {
    if (showError && value === undefined) {
      setLocalError(true);
    }
  }, [showError, value]); 

  return (
    <View className="w-full">
      {label && (
        <Text className={`w-full text-xl font-semibold ${localError ? "" : "pb-2"}`}>{label}</Text>
      )}
      {localError && <Text className="text-red-500 font-sans text-sm mt-1 pb-2">Este campo é obrigatório.</Text>}
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