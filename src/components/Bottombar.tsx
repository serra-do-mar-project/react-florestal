import { View } from "react-native";
import images from "../constants/images";

export default function BottomBar() {
  return (
    <View className="w-full bg-[#3E4B2E] py-4 px-6 flex-row justify-around items-center">
      <View className="items-center justify-center">
        <images.fundacaoFlorestalBranca width={60} height={60} style={{ resizeMode: "contain" }} />
      </View>
      <View className="items-center justify-center">
        <images.splogoBranca width={60} height={60} style={{ resizeMode: "contain" }} />
      </View>
    </View>
  );
}