import { AutosDeInfracao } from "@/src/db/schema";
import { DefaultModal, DefaultModalProps} from "../DeafaultModal";
import { View, Text, ScrollView } from "react-native";

type InfractionModalProps = DefaultModalProps & {
  item?: AutosDeInfracao;
}

export default function InfractionModal({item, ...rest}: InfractionModalProps) {
  return (
    <DefaultModal {...rest}>
      
      <View className="flex-1 items-center justify-center px-6 mb-4">
          <Text className="text-2xl text-center font-semibold">{item?.nome_resumo}</Text>
          <Text className="text-lg text-center font-BaiJamJuree_Medium pt-4">{item?.modelo}</Text>
      </View>
      
    </DefaultModal>

  );
}