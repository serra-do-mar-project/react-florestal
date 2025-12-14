import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import images from "../constants/images";

export interface ReturnButtonProps {
  onPress?: () => void;
  size?: number;
}

export default function ReturnButton({ onPress = router.back, size = 26}: ReturnButtonProps) {

  return (
    <TouchableOpacity
      className="flex justify-center items-center rounded-br-lg rounded-lg"
      onPress={() => onPress()}
    >
      <Image source={images.leftArrow} style={{ width: size, height: size, opacity: 0.9 }} contentFit="contain" />
    </TouchableOpacity>
  );

}