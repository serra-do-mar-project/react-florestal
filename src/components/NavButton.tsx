import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface NavButtonProps {
  title: string;
  onPress: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-green-200 py-3 px-4 rounded-xl w-full"
      onPress={onPress}
    >
      <Text className="text-center text-black font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default NavButton;