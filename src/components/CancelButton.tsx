import { Text, Pressable } from "react-native";
import { useState } from "react";


interface ButtonProps {
  title: string;
  onPress: () => void;
  classname?: string;
  textClass?: string;
}

export function CancelButton({ title, onPress, classname, textClass }: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex items-center justify-center w-44 h-14 pb-0.5 rounded-full  ${
        pressed ? "bg-green-500 border-x-hairline border-b-2 border-stone-700" : "border border-green-600 shadow-green-600"
      } ${classname}`}
    >
      <Text
        className={`text-gray-900 text-2xl font-semibold ${pressed && "text-white"} ${textClass}`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
