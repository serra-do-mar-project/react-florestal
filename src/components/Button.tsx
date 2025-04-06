import { Text, Pressable, StyleSheet } from "react-native";

interface ButtonProps {
  title: string; 
}

export function SubmitButton({ title }: ButtonProps) {
  return (
    <Pressable className="flex items-center justify-center w-[178px] h-[56px] pb-0.5 bg-green-400 rounded-full shadow-xl">
      <Text className=" text-black text-2xl font-semibold">
        {title}
        </Text>
    </Pressable>
  );
}
