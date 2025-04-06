import { Text, Pressable } from "react-native";

interface CheckboxProps {
  check: boolean;
  onPress: () => void;
}

export function Checkbox({ check, onPress }: CheckboxProps) {
  return (
    <Pressable
    onPress={onPress}
    className={`w-5 h-5 border-2 rounded-sm ${
      check ? "bg-green-400 border-green-600" : "bg-transparent border-gray-400"
    } flex items-center justify-center`}
  >
    {check && <Text className="text-white text-xs font-bold">✓</Text>}
  </Pressable>
  );
}
