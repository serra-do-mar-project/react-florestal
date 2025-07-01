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
      className={`flex items-center justify-center w-44 h-14 pb-0.5 rounded-full border-x-hairline border-b-2 border-stone-400 shadow-xl ${
        pressed ? "bg-gray-900/30" : "bg-gray-300"
      } ${classname}`}
    >
      <Text
        className={`text-gray-900 text-2xl font-semibold ${textClass}`}
        style={{
          
          textShadowOffset: { width: 1, height: 1},
          textShadowRadius: 1,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
