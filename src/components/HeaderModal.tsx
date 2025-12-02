import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "../lib/utils";

export function CancelButton({ onPress, label }: { onPress: () => void , label: string}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className="px-4 py-1 bg-gray-200 rounded-lg border border-x-hairline border-black/30"
    >
      <Text className="text-gray-900/70 font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}

export default function HeaderModal({ onPress, className, children }: { onPress: () => void, className?: string, children?: React.ReactNode }) {
  return (
    <View className={cn(" pb-3 border-b-2 border-gray-900/10 px-5 flex-row justify-between items-center", className)}>
      {children}
    </View>
  );
}