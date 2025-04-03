import { View, Text} from "react-native";
import images from "../constants/images";



const LogoOnca = () => {
  return (
    <View className="flex w-full h-60 mx-1 mt-12 justify-center items-center"> 
              <images.logoOnca width={440} height={320} />
              </View>
  );
}

export default LogoOnca