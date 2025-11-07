import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps} from "../DefaultModal";
import { View, Text, ScrollView } from "react-native";
import { SubmitButton } from "../SubmitButton";

type InfractionModalProps = DefaultModalProps & {
  item?: AutosDeInfracao;
}

export default function InfractionModal({item, ...rest}: InfractionModalProps) {


  return (
    <DefaultModal {...rest}>
      <ScrollView>
      <View className="items-center justify-center px-6 mb-8">
          <Text className="text-2xl text-center font-semibold">{item?.nome_resumo}</Text>
          <Text className="text-lg text-center font-BaiJamJuree_Medium pt-10">{item?.modelo}</Text>
          <SubmitButton classname="w-full mt-12" onPress={rest.onClose} title="Voltar" />
      </View>
      
      </ScrollView>

      
      
    </DefaultModal>

  );
}