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

export function HoursInput({children, textHolder, visible, onChangeText, label, title, showError = false, required = true}: props){
  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined | null>(undefined);
  const [displayValue, setDisplayValue] = useState(""); // Inicia vazio

  // Notifica o componente pai quando montado
  useEffect(() => {
    onChangeText?.(required ? undefined : null);
  }, []);

  const handleChangeText = (text: string) => {
    setLocalError(false); 
    // Remove tudo que não for número
    const numbers = text.replace(/\D/g, '');
    
    // Limita a 4 dígitos
    const limitedNumbers = numbers.slice(0, 4);
    
    // Formata conforme o número de dígitos
    let formatted = "";
    
    if (limitedNumbers.length === 0) {
      formatted = "";
    } else if (limitedNumbers.length === 1) {
      formatted = limitedNumbers[0] + "H:MM";
    } else if (limitedNumbers.length === 2) {
      formatted = limitedNumbers + ":MM";
    } else if (limitedNumbers.length === 3) {
      formatted = limitedNumbers.slice(0, 2) + ":" + limitedNumbers[2] + "M";
    } else if (limitedNumbers.length === 4) {
      formatted = limitedNumbers.slice(0, 2) + ":" + limitedNumbers.slice(2, 4);
    }
    
    setDisplayValue(formatted);
    onChangeText?.(limitedNumbers.length === 4 ? limitedNumbers.slice(0, 2) + ":" + limitedNumbers.slice(2, 4) : "");
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
        <Text className={`w-full text-xl font-semibold mt-1.5 ${localError || label ? "" : "pb-2"}`}>{title}</Text>
      )}
      {localError && <Text className={`${label? "" : "pb-2"} text-red-500 font-sans text-sm mt-0.5`}>Este campo é obrigatório.</Text>}
            {label && <Text className="font-sans text-gray-900/70 text-md pb-2 ">{label}</Text>}
      <View className="flex items-center justify-between flex-row w-40 h-10 mb-4 bg-[#EFEFEF] border border-gray-900/30 rounded-md shadow-lg">
        <TextInput 
          value={displayValue}
          onChangeText={handleChangeText}
          secureTextEntry={visible}
          className="flex-1 px-2 mt-0.5 text-black text-lg font-semibold"
          placeholder = "HH:MM"
          placeholderTextColor={"#9F9F9F"}
          keyboardType="numeric"
          maxLength={7}
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