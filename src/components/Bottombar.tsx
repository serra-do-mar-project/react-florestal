import { View } from "react-native";
import { Image } from "expo-image";
import images from "../constants/images";

export default function BottomBar() {
  return (
    <View className="w-full bg-[#3E4B2E] h-20  flex-row justify-around items-center">
      <View className="flex-1 items-center justify-center">
        <Image
          source={images.ifsplogoBranca}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
        />
      </View>
      <View className="flex-1 items-center justify-center">
        <Image
          source={images.fundacaoFlorestalBranca}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
        />
      </View>
      <View className="flex-1 items-center justify-center">
        <Image
          source={images.splogoBranca}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}