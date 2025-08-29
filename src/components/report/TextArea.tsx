import React from "react";
import { View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface TextAreaProps {
  label: string;
  textHolder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function TextArea({ label, textHolder, value, onChangeText }: TextAreaProps) {
  return (
    <View>
        <Text className="w-full text-xl pb-2 font-semibold">{label}</Text>
      <View className="flex w-full h-40 mb-5 bg-gray-100 border border-green-600 rounded-md shadow-lg">
        
            <TextInput 
            multiline
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            className="flex-1 text-black text-lg font-semibold m-3"
            placeholder = {textHolder}
          />
          
        </View>
    </View>
  );
}