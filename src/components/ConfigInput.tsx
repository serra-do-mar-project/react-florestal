import { View, TextInput, Text, Platform, StyleSheet } from "react-native";
import { cn } from "../lib/utils";

interface props {
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  textHolder?: string;
  visible?: boolean; // cuidado: se "visible" significa mostrar o texto, use secureTextEntry={!visible}
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
}

export function Configinput({
  size = "sm",
  children,
  textHolder,
  visible = true,
  value,
  onChangeText,
  label,
  className,
}: props) {
  return (
    <View className="w-full">
      {label && <Text className="w-full text-xl pb-2 font-semibold">{label}</Text>}

      <View
        className={cn(
          "items-center justify-between flex-row w-full h-10 px-4 bg-gray-100 border border-green-600 rounded-md shadow-lg",
          className
        )}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          placeholder={textHolder}
          placeholderTextColor="#6B7280"
          className="flex-1 text-black text-lg font-semibold"
          // estilos inline que garantem centralização do placeholder no Android/iOS
          style={{
            height: 26, 
            paddingVertical: 0,
            textAlignVertical: "center",
            lineHeight: 26
          }}
          numberOfLines={1}
          multiline={false}
        />

        {children && <View className="items-center justify-center">{children}</View>}
      </View>
    </View>
  );
}