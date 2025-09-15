import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";

interface Props {
  textHolder?: string;
  onChangeText: (text: any) => void;
  title?: string;
  label?: string;
  showError?: boolean;
  required?: boolean;
  value?: string;
}

export function DurationInput({
  textHolder = "HH:MM",
  onChangeText,
  label,
  title,
  showError = false,
  required = true,
  value,
}: Props) {
  const [localError, setLocalError] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  // Inicializa o valor
  useEffect(() => {
    onChangeText?.(required ? undefined : null);
  }, []);

  const handleTextChange = (text: string) => {
    // Remove tudo que não for número
    const numbersOnly = text.replace(/\D/g, "").slice(0, 4);

    let formatted = numbersOnly;

    if (numbersOnly.length === 0) {
      formatted = "";
    } else if (numbersOnly.length <= 2) {
      formatted = numbersOnly;
    } else {
      // split hours and minutes from the end
      const hoursPart = numbersOnly.slice(0, numbersOnly.length - 2);
      const minutesPart = numbersOnly.slice(-2);
      let hoursNum = parseInt(hoursPart, 10) || 0;
      let minutesNum = parseInt(minutesPart, 10) || 0;
      // carry minutes into hours when >= 60
      if (minutesNum >= 60) {
        const carry = Math.floor(minutesNum / 60);
        minutesNum = minutesNum % 60;
        hoursNum += carry;
      }
      if (hoursNum > 99) hoursNum = 99;
      formatted = String(hoursNum) + ":" + String(minutesNum).padStart(2, "0");
    }

    setInternalValue(formatted);

    // Só envia valor completo HH:MM para o pai
    onChangeText?.(numbersOnly.length === 4 ? formatted : "");
    setLocalError(false);
  };

  useEffect(() => {
    if (showError && required && internalValue === "") {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, internalValue, required]);

  useEffect(() => {
    if (value && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <View className="w-full">
      {title && (
        <Text className={`text-xl font-semibold mt-1.5 ${localError || label ? "" : "mb-2"}`}>
          {title}
        </Text>
      )}

      {localError && (
        <Text className={`text-red-500 text-sm font-sans mt-0.5 ${label ? "" : "mb-2"}`}>
          Este campo é obrigatório.
        </Text>
      )}

      {label && <Text className="text-gray-600 text-md font-sans mb-1">{label}</Text>}

      <View className="flex items-center justify-center flex-row  bg-[#EFEFEF] w-24 h-fit mb-4 py-1 border border-gray-900/30 rounded-lg shadow-md ">
        <TextInput
          value={internalValue}
          onChangeText={handleTextChange}
          placeholder={textHolder}
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          maxLength={7}
          className="flex-1 pt-0.5 px-2 text-center text-black text-xl font-italic"
          style={{ letterSpacing: 2 }}
        />
      </View>
    </View>
  );
}
