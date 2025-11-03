import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps} from "../DefaultModal";
import { View, Text, ScrollView } from "react-native";

type InfractionModalProps = DefaultModalProps & {
  item?: AutosDeInfracao;
}

export default function InfractionModal({item, ...rest}: InfractionModalProps) {


  return (
    <DefaultModal {...rest}>
      <ScrollView>
      <View className="items-center justify-center px-6 mb-20">
          <Text className="text-2xl text-center font-semibold">{item?.nome_resumo}</Text>
          <Text className="text-lg text-center font-BaiJamJuree_Medium pt-10">{item?.modelo}</Text>
      </View>
      </ScrollView>
      
    </DefaultModal>

  );
}