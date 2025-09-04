import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

interface TextAreaProps {
  title: string;
  label?: string;
  textHolder?: string;
  onChangeText: (text: string | undefined | null) => void;
  showError?: boolean;
  required?: boolean;
}

export default function TextArea({ title, textHolder, onChangeText, showError = false, required = true, label}: TextAreaProps) {

  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined | null>(undefined);

  useEffect(() => {
    onChangeText?.(undefined);
  }, []);

  const handleChangeText = (text: string) => {
    setLocalError(false); 
    if(text === ""){
        if(required){
          setValue(undefined);
          onChangeText(undefined);
        }
        else{
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
    }
  }, [showError, value, required]); 

  return (
    <View className="w-full">
      <Text className={`w-full text-xl font-semibold mt-3 ${localError || label ? "" : "pb-2"}`}>{title}</Text>
      {localError && <Text className={`${label? "" : "pb-2"} text-red-500 font-sans text-sm mt-0.5`}>Este campo é obrigatório.</Text>}
      {label && <Text className="text-gray-800 font-sans text-md mt- pb-2 ">{label}</Text>}
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