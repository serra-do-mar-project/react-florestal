import { View, Text, FlatList, Modal } from "react-native";
import InfractionModal from "@/src/components/infractions/InfractionModal";
import { InfractionsList, InfractionsListHandle } from "@/src/components/infractions/InfractionsList";
import { useState, useRef, useCallback } from "react";
import { AutosDeInfracao } from "@/src/db/schema";
import { useFocusEffect } from '@react-navigation/native';
import { DefaultModal } from "@/src/components/DefaultModal";
import OptionsBar from "@/src/components/infractions/OptionsBar";


export default function Infractions() {
  const listRef = useRef<InfractionsListHandle | null>(null);
  const [selectedItem, setSelectedItem] = useState<AutosDeInfracao>();
  const [openModal, setOpenModal] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);


  useFocusEffect(
    useCallback(() => {
      listRef.current?.refresh();
    }, [])
  );

  function handleSelect(item: AutosDeInfracao) {
    setSelectedItem(item);
    setOpenModal(true);
  }

  const handleSelectAll = (value: boolean) => {
    if (value) {
      listRef.current?.selectAll();
    } else {
      listRef.current?.clearSelection();
    }
  };

  const resetSelection = () => {
    listRef.current?.clearSelection();
  };

  const handleDelete = async () => {
    await listRef.current?.deleteSelected();
  };

  // Calculado após cada render/update
  const selectedCount = listRef.current?.getSelectionCount() || 0;
  const isAllSelected = listRef.current?.isAllSelected() || false;
  const isInSelectionMode = listRef.current?.isInSelectionMode() || false;


  return (
    <View className="w-full h-full">
      <View className={`bg-[#fffdfd] pt-10 shadow shadow-black ${isInSelectionMode ? 'pb-2' : 'pb-5'}`}>

        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">ACIA - Auto de Constatação de Infração Ambiental</Text>

        {isInSelectionMode && (

          <OptionsBar
            onSelectAll={() => handleSelectAll(!isAllSelected)}
            numberSelected={selectedCount}
            onCancel={resetSelection}
            isAllSelected={isAllSelected}
            onDelete={handleDelete}
          />

        )}

      </View>
      <View className="flex-1 px-5">
        <InfractionsList
          ref={listRef}
          onSelect={handleSelect}
          onSelectionChange={() => setUpdateTrigger(prev => prev + 1)}
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