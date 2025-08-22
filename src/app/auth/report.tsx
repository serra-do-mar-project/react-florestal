import DropdownBox from "@/src/components/report/DropdownBox";
import images from "@/src/constants/images";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportPage() {

  return (
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black mb-10 ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Relátorio diário</Text>
      </View>

      <ScrollView className="flex-1">

        <View className="bg-white pb-7 mx-5 border border-gray-800/80 rounded-lg">
          <View className="px-6 py-3">
            <Text className="text-gray-800 text-sm pb-1.5">
              Página 01 de 05
            </Text>
            <Text className="font-bold pb-1.5" style={{ fontSize: 23 }}>
              Seção
            </Text>
            <Text className="text-gray-800 text-sm">
              Preencha esses campos abaixo
            </Text>
          </View>

          <View className="flex-row pt-10 pb-5 mx-8 justify-around">
              
            <DropdownBox/>
            <DropdownBox/>

          </View>


          
        </View>

      </ScrollView>

      

      
    </View>
  );
}