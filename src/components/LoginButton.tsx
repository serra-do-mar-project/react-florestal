import { Text, Pressable, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function SubmitButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable className="flex items-center justify-center w-44 h-14 pb-0.5 bg-green-800 rounded-full shadow-xl" onPress={onPress}>
      <Text className=" text-white text-2xl font-serif font-[550] antialised">
        {title}
        </Text>
    </Pressable>
  );
}
