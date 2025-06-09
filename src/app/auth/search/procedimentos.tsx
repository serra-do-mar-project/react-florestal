import { SubmitButton } from "@/src/components/SubmitButton";
import Title from "@/src/components/Title";
import images from "@/src/constants/images";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProcedimentosPage() {

  return (
    <View className="flex-1">
      <View className="bg-[#fffdfd] pt-10 pb-5 border-x-hairline border-b-1 border-gray-900/30 shadow shadow-black ">
          <View className="w-full flex-row items-center justify-between mb-5 px-5 ">
            <TouchableOpacity
              className="flex justify-center items-center rounded-br-lg rounded-tr-lg"
              onPress={() => router.push("/auth/search")}
            >
              <images.leftArrow width={26} height={26} style={{ resizeMode: "contain", opacity: 0.9  }} />
            </TouchableOpacity>
            
            <View
                  className=" bg-green-500/30 flex justify-center items-center rounded-full px-3 py-1"
                >
                  <Text className="text-gray-900/100 text-lg font-semibold">Cortes de Arvores</Text>
                </View>
            
          </View>
              <View className="ml-7 "><Text className="text-gray-900 font-semibold text-2xl">Procedimentos Operacionais</Text></View>
              
            
          </View>

          <View className="flex-1 items-center mt-14">

            <View className="w-[90%] h-[80%] bg-white border border-green-100 rounded-2xl shadow shadow-black">
                <ScrollView className="flex-1 mx-5 my-7">
                  <Text className="text-lg font-medium text-stone-800 mb-5">1- Verificar se é possível uma abordagem segura;</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">2- Fazer a abordagem do indíviduo;</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">3- Registrar a ação com foto e/ou vídeo</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">4- Informá-lo sobre o crime ambiental utilizando a legislação infringida (se possível o Artigo);</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">5- Comunicar imediatamente a PAMB para a devida autuação e apoio;</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">6- Comunicar imediatamente o Gestor da UC para ciência e apoio;</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">7- Apreender o armamento, instrumento ou armadilha;</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">8- Elaborar o ACIA/RVA (qualificação, coordenadas, etc.);</Text>
                   <Text className="text-lg font-medium text-stone-800 mb-3">9- Encaminhar o(s) infratores(es) ao DP responsável pela área para lavratura do BOPC (sempre na presença de um funcionário da FF ou IF).</Text>
                </ScrollView>
            </View>
              
                <SubmitButton classname="h-[3rem] w-36 mt-9" textClass="text-xl" title="Prosseguir" onPress={() => router.push("/auth/search")}/>
              

          </View>

    </View>
  );
}