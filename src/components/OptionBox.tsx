import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Title from "./Title";
import images from "../constants/images";

interface Option {
  label: string;
  value: string;
}

interface OptionBoxProps {
  title: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OptionBox({ options, value, onChange, title, placeholder = "Selecione uma opção" }: OptionBoxProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <View className="w-full mb-5 mt-1 items-start">
      <Text className="w-full text-xl pb-3 font-medium">{title}</Text>

      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="h-12 px-4 bg-gray-100 border border-green-600 rounded-md flex-row items-center justify-between"
      >
        <Text className={`text-lg pr-4  ${value ? "text-black" : "text-gray-400"}`}>
          {selectedLabel}
        </Text>

        <Image
          source={images.arrow}
          style={{ width: 24, height: 24 }}
          className={`transition-transform duration-150 ${open ? "rotate-180 " : ""}`}
          contentFit="contain"
          tintColor="black"
        />

      </TouchableOpacity>
      {open && (
        <View className=" bg-white border border-green-600 pt-2 rounded-md mt-1 absolute top-20 z-10">
          {options.map(opt => (
            <TouchableOpacity
              key={opt.value}
              className="pb-2 pl-4 pr-9"
              onPress={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <Text className="text-lg">{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}