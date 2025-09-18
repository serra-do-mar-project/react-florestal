import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

interface TextAreaProps {
  title: string;
  label?: string;
  textHolder?: string;
  onChangeText: (text: string | undefined | null) => void;
  showError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function TextArea({ title, textHolder, onChangeText, showError = false, required = true, label, disabled = false }: TextAreaProps) {

  const [localError, setLocalError] = useState(false);
  const [value, setValue] = useState<string | undefined | null>(undefined);
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);

  useEffect(() => {
    onChangeText?.(undefined);
  }, []);

  useEffect(() => {
    if (disabled && !prevDisabled) {
      onChangeText?.(null);
    } else {
      const isEmpty = value === undefined || value === null || value === '';
      if (isEmpty) {
        onChangeText?.(required ? undefined : null);
      } else {
        onChangeText?.(value);
      }
    }
    setPrevDisabled(!!disabled);
  }, [required, disabled, value]);

  const handleChangeText = (text: string) => {
    if (disabled) {
      onChangeText?.(null);
      return;
    }
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
    }
  }, [showError, value, required]); 

  return (
    <View className="w-full">
      <View className={` ${disabled ? 'opacity-60' : ''}` }>
        <Text className={`w-full text-xl font-semibold mt-3 ${localError || label ? "" : "pb-2"}`}>{title}</Text>
        {localError && <Text className={`${label? "" : "pb-2"} text-red-500 font-sans text-sm mt-0.5`}>Este campo é obrigatório.</Text>}
        {label && <Text className="font-sans text-gray-900/70 text-md mt- pb-2 ">{label}</Text>}
      </View>
      <View className="flex w-full h-40 mb-5 bg-[#EFEFEF] border border-gray-900/30 rounded-md shadow-lg">
        <TextInput 
          multiline
          textAlignVertical="top"
          value={value || ""}
          onChangeText={handleChangeText}
          editable={!disabled}
          className={`flex-1 text-lg font-semibold m-3 ${disabled ? 'text-gray-900/50' : 'text-black'}`}
          placeholder={textHolder}
          placeholderTextColor={"#9F9F9F"}
        />
      </View>
    </View>
  );
}