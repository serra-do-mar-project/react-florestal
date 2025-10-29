import InfractionCard from "@/src/components/infractions/InfractionCard";
import { useState } from "react";
import { View, Text, FlatList, Modal } from "react-native";
import OptionsBar from "@/src/components/infractions/OptionsBar";
import {AutosDeInfracao } from "@/src/db/schema";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { fetchAutos, deleteAutos } from '@/src/hooks/useAutos';
import InfractionModal from "@/src/components/infractions/InfractionModal";


export default function Infractions() {

  const [cardSelected, setCardSelected] = useState<number[]>([]);
  const [longPressed, setlongPressed] = useState(false)
  const [selectAll, setSelectAll] = useState(false);
  const [listData, setListData] = useState<AutosDeInfracao[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AutosDeInfracao>();


  const handleDelete = useCallback(async (ids: number[]) => {
    await deleteAutos(ids);
    handleCancel();
    refreshAutos();
  }, []);

  const refreshAutos = useCallback(async () => {
    const autos = await fetchAutos();
    setListData(autos);
  }, []);

  useFocusEffect(
  useCallback(() => {
    refreshAutos();
    }, [refreshAutos]),
  )

    function handleSelectAll(value: boolean) {
      setSelectAll(value);
      if (value) {
        setCardSelected(listData.map((item) => item.id));
      } else {
        setCardSelected([]);
      }
    }

    function handleCancel() {
      setlongPressed(false);
      setSelectAll(false);
      setCardSelected([]);
    }

  return(
    <View className="flex w-full h-full">
          <View className="bg-[#fffdfd] pt-7 pb-5 shadow shadow-black ">
            <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
            </View>
            <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Autos de infração</Text>
          </View>
 
          
            <FlatList
              className="flex-1 px-5"
              ListHeaderComponent={
                <View className="mb-2 pt-8">
                  {longPressed && 
                    <OptionsBar 
                      onSelectAll={(e) => handleSelectAll(e)} 
                      numberSelected={cardSelected.length} 
                      onCancel={() => handleCancel()}  
                      isAllSelected={cardSelected.length > 0 && cardSelected.length === listData.length}
                      onDelete={() => handleDelete(cardSelected)}
                    />
                  }
                </View>
                }
              data={listData}
              keyExtractor={(item) => String((item as any).id)}
              extraData={cardSelected}
              ItemSeparatorComponent={  () => <View className="h-4" /> }
              renderItem={({ item }) => {
                 
                return (
                  <InfractionCard
                    key={item.id}
                    title={item.nome_resumo}
                    date={item.data}
                    tag={item.tags}
                    onPress={() =>( setOpenModal(true), setSelectedItem(item))}
                    onSelect={() => {
                      setCardSelected((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]));
                    }}
                    isSelected={cardSelected.includes(item.id)}
                    selectMode={longPressed || selectAll}
                    onlongPress={() => {
                      setlongPressed(true);
                      setCardSelected((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
                    }}
                  />
                );
              }}
               ListFooterComponent={<View className="h-10" />}
            />
            <InfractionModal item={selectedItem} visible={openModal} onClose={() => setOpenModal(false) }>
              
            </InfractionModal>
          </View>
  )
}