import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
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
            <images.leftArrow width={26} height={26} style={{ resizeMode: "contain", opacity: 0.9 }} />
          </TouchableOpacity>
  );

}