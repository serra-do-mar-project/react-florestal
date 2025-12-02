import { View, TextInput, Text, KeyboardTypeOptions } from "react-native";
import { cn } from "../lib/utils";

interface props {
  className?: string;
  children?: React.ReactNode;
  textHolder?: string;
  visible?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export function Configinput({

  children,
  textHolder,
  visible = true,
  value,
  onChangeText,
  label,
  className,
  error,
  keyboardType,
  maxLength,
  autoCapitalize,
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
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
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
      {error && <Text className="w-full text-red-500 mt-1 pl-4 pb-2">{error}</Text>}
    </View>
  );
}