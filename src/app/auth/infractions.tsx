import { View, Text, FlatList, Modal } from "react-native";
import InfractionModal from "@/src/components/infractions/InfractionModal";
import { InfractionsList, InfractionsListHandle } from "@/src/components/infractions/InfractionsList";
import { useState, useRef, useCallback } from "react";
import { AutosDeInfracao } from "@/src/db/schema";
import { useFocusEffect } from '@react-navigation/native';
import { DefaultModal } from "@/src/components/DefaultModal";


export default function Infractions() {
  const listRef = useRef<InfractionsListHandle | null>(null);
  const [selectedItem, setSelectedItem] = useState<AutosDeInfracao>();
  const [openModal, setOpenModal] = useState(false);


  useFocusEffect(
    useCallback(() => {
      listRef.current?.refresh();
    }, [])
  );

  function handleSelect(item: AutosDeInfracao) {
    setSelectedItem(item);
    setOpenModal(true);
  }


  return (
    <View className="w-full h-full">
      <View className="bg-[#fffdfd] pt-7 pb-5 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Autos de infração</Text>
      </View>
      <View className="flex-1 px-5">
        <InfractionsList
          ref={listRef}
          onSelect={handleSelect}
          listFooterComponent={<View className="h-20" />}
          className="pt-10"
        />
      </View>
      <DefaultModal visible={openModal} onClose={() => setOpenModal(false)} >
        <InfractionModal item={selectedItem} />
      </DefaultModal>
    </View>
  )
}