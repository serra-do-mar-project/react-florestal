import { Text, Pressable } from "react-native";
import { useState } from "react";


interface ButtonProps {
  title: string;
  onPress: () => void;
  classname?: string;
  textClass?: string;
}

export function SubmitButton({ title, onPress, classname, textClass }: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex items-center justify-center w-44 h-14 pb-0.5 rounded-2xl border-x-hairline border-b-2 border-stone-700 shadow-xl ${
        pressed ? "bg-green-900" : "bg-green-500"
      } ${classname}`}
    >
      <Text
        className={`text-white text-2xl font-semibold ${textClass}`}
        style={{
          textShadowColor: '#45503F',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
