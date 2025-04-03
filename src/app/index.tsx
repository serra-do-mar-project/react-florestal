import { Text, View, Image } from "react-native";
import images from '../constants/images'
import LoginTitle from "../components/LoginTitle";
import LogoOnca from "../components/LogoOnca";

export default function Index() {
  return (
      <View className="w-screen h-screen flex-1">

          <LoginTitle/>

          <LogoOnca/>

          <View className="flex items-center mt-10">
              <View className="w-96 h-16 bg bg-gray-100 border-[1px] border-green-600 rounded-full">

              </View>
          </View>


      </View>
       
      

  );
}
