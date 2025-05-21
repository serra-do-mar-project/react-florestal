import { Text, Pressable } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function SubmitButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable className="flex items-center justify-center w-44 h-14 pb-0.5 bg-[#496A37] rounded-full border-x-hairline border-b-2 border-stone-700 shadow-xl" onPress={onPress}>
      <Text
        className="text-white text-2xl font-semibold"
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
