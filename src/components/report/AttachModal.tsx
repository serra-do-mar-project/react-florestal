import { View, Text } from "react-native";
import { InfractionsList, InfractionsListHandle } from "@/src/components/infractions/InfractionsList";
import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { AutosDeInfracao } from "@/src/db/schema";

type AttachModalProps = {
  visible: boolean;
  onSelect: (selectedItems: AutosDeInfracao[]) => void;
};

export function AttachModal({ visible, onSelect }: AttachModalProps) {
  const listRef = useRef<InfractionsListHandle | null>(null);

  useEffect(() => {
    if (!visible) return;

    const prepareList = async () => {
      await listRef.current?.refreshAndSelectAll();
    };

    prepareList();
  }, [visible]);

  function handleSelect() {
    const selectedItems = listRef.current?.getSelected() || [];
    onSelect(selectedItems);
  }


  return (
    <View className="w-full px-5">
      <Text className="w-full text-2xl font-medium text-center text-gray-900" >Anexar Infrações</Text>
      <Text className="w-full font-BaiJamJuree_Medium text-center mt-1">
        Selecione os Autos que deseja inserir no relatório
      </Text>

      <View className="-max-h-screen-safe-offset-44 pb-8 pt-4">
        <InfractionsList ref={listRef} pressedMode={visible} deleteOption={false} cancelOption={false} />
      </View>


      <View className="w-full px-5 items-center pb-10">
        <SubmitButton classname="w-full" title="Finalizar" onPress={handleSelect} />
      </View>
    </View>
  );
}