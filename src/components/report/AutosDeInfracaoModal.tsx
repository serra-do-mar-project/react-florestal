import { AutosDeInfracao } from "@/src/db/schema";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { fetchAutos } from "@/src/hooks/useAutos";
import InfractionCard from "../infractions/InfractionCard";

export const AutosDeInfracaoModal = ({ visible, setVisible, setSelected, resetKey }: { visible: boolean, setVisible: (visible: boolean) => void, setSelected: (selected: AutosDeInfracao[]) => void, resetKey?: number }) => {
  const [cardSelected, setCardSelected] = useState<number[]>([]);
  const [listData, setListData] = useState<AutosDeInfracao[]>([]);

  const refreshAutos = useCallback(async () => {
    const autos = await fetchAutos();
    setListData(autos);
  }, []);

  // Carrega os autos quando o modal fica visível
  useEffect(() => {
    if (visible) {
      refreshAutos();
    }
  }, [visible, refreshAutos]);

  // If parent signals a reset (via resetKey), clear selections
  useEffect(() => {
    if (typeof resetKey !== 'undefined') {
      setCardSelected([]);
    }
  }, [resetKey]);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      transparent={false}
    >
      <View className="flex-1">
        <View className="pt-10 pb-5 border-b border-gray-900/10 shadow-sm">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-gray-900 font-semibold text-2xl">Autos de Infração</Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Text className="text-gray-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          className="flex-1 px-5"
          ListHeaderComponent={
            <View className="my-4">
              <TouchableOpacity
                onPress={() => {
                  const selected = listData.filter((item) => cardSelected.includes(item.id))
                  setSelected(selected);
                  setVisible(false);
                }}
                className="bg-green-500 py-3 px-6 rounded-lg items-center"
              >
                <Text className="text-white font-semibold text-lg">
                  Concluir ({cardSelected.length} selecionados)
                </Text>
              </TouchableOpacity>
            </View>
          }
          data={listData}
          keyExtractor={(item) => String((item as any).id)}
          extraData={cardSelected}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => {

            return (
              <InfractionCard
                key={item.id}
                title={item.nome_resumo}
                date={item.data}
                tag={item.tags}
                onSelect={() => {
                  setCardSelected((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]));
                }}
                isSelected={cardSelected.includes(item.id)}
                selectMode={true}
              />
            );
          }}
          ListFooterComponent={<View className="h-10" />}
        />
      </View>
    </Modal>
  )
}