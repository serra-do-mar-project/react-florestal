import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps, useModal } from "../DefaultModal";
import { View, Text, ScrollView } from "react-native";
import { SubmitButton } from "../SubmitButton";
import HeaderModal, { CancelButton } from "../HeaderModal";

type InfractionModalProps = {
  item?: AutosDeInfracao;
}
export default function InfractionModal({ item }: InfractionModalProps) {

  const { closeWithAnimation } = useModal();
  const [date, time] = item?.data?.split(', ') || ['', ''];

  return (
 
    <ScrollView className="w-full">
      <View className="w-full pb-10">
        <HeaderModal className="px-7 pb-3 items-start" onPress={closeWithAnimation}>
          <View className="flex-1 ">
            <Text className="text-2xl pb-3 pl-1 font-medium">{item?.nome_resumo}</Text>
            <View className="w-full flex-row px-1 justify-between items-center gap-4">


              <View className="flex-row items-center gap-2">
                <Text className="text-base font-medium text-gray-700">{date}</Text>
                <Text className="text-base font-medium text-gray-700">•</Text>
                <Text className="text-base font-medium text-gray-700">{time}</Text>
              </View>

              <CancelButton label="Voltar" onPress={closeWithAnimation}/>
              
            </View>
          </View>
      
        </HeaderModal>
        <Text className="text-lg px-7 text-justify font-BaiJamJuree_Medium pt-6">{item?.descricao}</Text>
      </View>
      
      
    </ScrollView>

  );
}