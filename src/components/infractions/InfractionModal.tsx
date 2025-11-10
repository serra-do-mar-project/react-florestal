import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps, useModal} from "../DefaultModal";
import { View, Text, ScrollView } from "react-native";
import { SubmitButton } from "../SubmitButton";

type InfractionModalProps = {
  item?: AutosDeInfracao;
}

export default function InfractionModal({item}: InfractionModalProps) {

  const { closeWithAnimation } = useModal();

  return (
    
      <ScrollView>
      <View className="items-center justify-center px-6 mb-8">
          <Text className="text-2xl text-center font-semibold">{item?.nome_resumo}</Text>
          <Text className="text-lg text-center font-BaiJamJuree_Medium pt-10">{item?.modelo}</Text>
          <SubmitButton classname="w-5/6 mt-12" onPress={closeWithAnimation} title="Voltar" />
      </View>
      
      </ScrollView>

      
      
    

  );
}