import { View, Text } from "react-native";
import {InfractionsList, InfractionsListHandle } from "@/src/components/infractions/InfractionsList";
import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "../SubmitButton";

type AttachModalProps = {
  visible: boolean;
  onSelect: (selectedIds: number[]) => void;
};

export function AttachModal({ visible , onSelect}: AttachModalProps) {

   const listRef = useRef<InfractionsListHandle | null>(null);
   const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!visible) return;
    (async () => {
      await listRef.current?.refreshAndSelectAll?.();
    })();
  }, [visible]);

  return (
      <View className="w-full px-5">
          <Text className="w-full text-2xl font-medium text-center text-gray-900" >Anexar Infrações</Text>
          <Text className="w-full font-BaiJamJuree_Medium text-center mt-1">
            Selecione os Autos que deseja inserir no relatório
          </Text>
      
          <View className="-max-h-screen-safe-offset-44 pb-8">
              <InfractionsList ref={listRef} pressedMode={visible} deleteOption={false} cancelOption={false} onSelectChange={setSelectedIds}/>
          </View>
            

          <View className="w-full items-center pb-10">
            <SubmitButton title="Finalizar" onPress={() => onSelect(selectedIds)} />
          </View>

      </View>
  );
}