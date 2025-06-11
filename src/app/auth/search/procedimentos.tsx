import { SubmitButton } from "@/src/components/SubmitButton";
import images from "@/src/constants/images";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProcedimentosPage() {

const params = useLocalSearchParams();

  return (
    <View className="flex-1">
      <View className="bg-[#fffdfd] pt-10 pb-5 border-x-hairline border-b-1 border-gray-900/30 shadow shadow-black ">
          <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
            <TouchableOpacity
              className="flex justify-center items-center rounded-br-lg rounded-tr-lg"
              onPress={() => router.back}
            >
              <images.leftArrow width={26} height={26} style={{ resizeMode: "contain", opacity: 0.9  }} />
            </TouchableOpacity>
            
            <View
                  className=" bg-green-500/30 flex justify-center items-center rounded-full px-3 py-1"
                >
                  <Text className="text-gray-900/100 text-lg font-semibold">{params.categoria}</Text>
                </View>
            
          </View>
              <View className="ml-7 "><Text className="text-gray-900 font-semibold text-3xl">{params.nome}</Text></View>
              
            
          </View>

         

          <View className="flex-1 items-center">
            <ScrollView 
              className="w-full h-full" 
              showsVerticalScrollIndicator={false}  
              contentContainerStyle={{ alignItems: "center"}}
            >
                <View className="w-full ml-16 mt-14 mb-5 flex-row items-center"><Text className="text-gray-900 font-semibold text-2xl">Natureza do Dano</Text> <Text className="text-gray-900 font-semibold text-xl pl-2">(Infração/Crime)</Text></View>

                <View className="w-[90%] bg-white border border-green-100 rounded-2xl shadow shadow-black mb-14">
                    <View  className="flex-1 mx-5 my-7" >

                    </View>
                </View>

                <View className="w-full ml-16 mb-5"><Text className="text-gray-900 font-semibold text-2xl">Procedimentos Operacionais</Text></View>

                <View className="w-[90%] bg-white border border-green-100 rounded-2xl shadow shadow-black">
                  <View className="flex-1 mx-5 my-7">
                    {(params.procedimento ?? "")
                      .toString()
                      .split(";")
                      .map((item, idx) =>
                        item.trim() ? (
                          <Text key={idx} className="text-base text-stone-700 mb-2">
                            {item.trim()}.
                          </Text>
                        ) : null
                      )
                    }
                  </View>
                </View>
                  
                    <SubmitButton classname="h-[3rem] w-[9rem] mt-9 mb-10" textClass="text-xl" title="Prosseguir" onPress={() => router.push("/auth/search")}/>
                  
            </ScrollView>
          </View>

    </View>
  );
}