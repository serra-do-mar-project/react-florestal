import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

interface TextAreaProps {
  label: string;
  textHolder?: string;
  onChangeText: (text: string | undefined) => void;
  showError?: boolean;
}

export default function TextArea({ label, textHolder, onChangeText, showError = false }: TextAreaProps) {

  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

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
      <Text className={`w-full text-xl font-semibold ${localError ? "" : "pb-2"}`}>{label}</Text>
      {localError && <Text className="text-red-500 font-sans text-sm mt-1 pb-2">Este campo é obrigatório.</Text>}
      <View className="flex w-full h-40 mb-5 bg-[#EFEFEF] border border-gray-900/30 rounded-md shadow-lg">
        <TextInput 
          multiline
          textAlignVertical="top"
          value={value || ""}
          onChangeText={handleChangeText}
          className="flex-1 text-black text-lg font-semibold m-3"
          placeholder={textHolder}
        />
      </View>
    </View>
  );
}