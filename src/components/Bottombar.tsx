import { View } from "react-native";
import images from "../constants/images";

export default function BottomBar() {
  return (
    <View className="w-full bg-[#3E4B2E] h-20  flex-row justify-around items-center">
      <View className="flex-1 items-center justify-center">
        <images.ifsplogoBranca width={100} height={50} style={{ resizeMode: "contain" }} />
      </View>
      <View className="flex-1 items-center justify-center">
        <images.fundacaoFlorestalBranca width={100} height={60} style={{ resizeMode: "contain" }} />
      </View>
      <View className="flex-1 items-center justify-center">
        <images.splogoBranca width={100} height={45} style={{ resizeMode: "contain" }} />
      </View>
    </View>
  );
}