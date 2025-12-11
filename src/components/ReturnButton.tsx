import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import images from "../constants/images";

export interface ReturnButtonProps {
  onPress?: () => void;
}

export default function ReturnButton({ onPress = router.back }: ReturnButtonProps) {

  return (
    <TouchableOpacity
      className="flex justify-center items-center rounded-br-lg rounded-lg"
      onPress={() => onPress()}
    >
      <Image source={images.leftArrow} style={{ width: 26, height: 26, opacity: 0.9 }} contentFit="contain" />
    </TouchableOpacity>
  );

}