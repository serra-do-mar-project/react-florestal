import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps, useModal } from "../DefaultModal";
import { View, Text, ScrollView } from "react-native";
import { SubmitButton } from "../SubmitButton";

type InfractionModalProps = {
  item?: AutosDeInfracao;
}
export default function InfractionModal({ item }: InfractionModalProps) {

  const { closeWithAnimation } = useModal();

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center px-6 pb-6">
          <Text className="text-2xl text-center font-semibold">{item?.nome_resumo}</Text>
          <Text className="text-lg text-center font-BaiJamJuree_Medium pt-10">{item?.descricao}</Text>
        </View>
      </ScrollView>
      <View className="items-center justify-center px-6 mb-6 border-t border-gray-300">
        <SubmitButton classname="w-5/6 mt-6" onPress={closeWithAnimation} title="Voltar" />
      </View>
    </View>
  );
}