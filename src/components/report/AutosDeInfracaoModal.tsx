import { AutosDeInfracao } from "@/src/db/schema";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { fetchAutos } from "@/src/hooks/useAutos";
import InfractionCard from "../infractions/InfractionCard";
import { DefaultModal, useModal } from "../DefaultModal";
import HeaderModal, { CancelButton } from "../HeaderModal";
import { cn } from "@/src/lib/utils";

export const AutosDeInfracaoModal = ({ visible, setVisible, setSelected, resetKey }: { visible: boolean, setVisible: (visible: boolean) => void, setSelected: (selected: AutosDeInfracao[]) => void, resetKey?: number }) => {
  const [cardSelected, setCardSelected] = useState<number[]>([]);
  const [tempSelected, setTempSelected] = useState<number[]>([]);
  const [listData, setListData] = useState<AutosDeInfracao[]>([]);

  const refreshAutos = useCallback(async () => {
    const autos = await fetchAutos();
    setListData(autos);
  }, []);

  // Carrega os autos quando o modal fica visível
  useEffect(() => {
    if (visible) {
      refreshAutos();
      // Restaura as seleções confirmadas ao abrir
      setTempSelected([...cardSelected]);
    }
  }, [visible, refreshAutos]);

  // If parent signals a reset (via resetKey), clear selections
  useEffect(() => {
    if (typeof resetKey !== 'undefined') {
      setCardSelected([]);
      setTempSelected([]);
    }
  }, [resetKey]);

  const Modalcontent = () =>{
     const { closeWithAnimation } = useModal();

    const handleCancel = () => {
      // Volta ao último ponto de partida (descarta mudanças temporárias)
      setTempSelected([...cardSelected]);
      closeWithAnimation();
    };

    const handleConfirm = () => {
      // Salva as seleções temporárias como definitivas
      setCardSelected([...tempSelected]);
      const selected = listData.filter((item) => tempSelected.includes(item.id));
      setSelected(selected);
      closeWithAnimation();
    };

    return ( 
      <View className="w-full">
          <HeaderModal onPress={handleCancel}>
            <Text className="text-gray-900 font-semibold text-2xl">Autos de Infração</Text>
            <CancelButton label="Cancelar" onPress={handleCancel}  />
          </HeaderModal>
        <FlatList
          className="-max-h-screen-safe-offset-44 px-5 pt-10"
          data={listData}
          keyExtractor={(item) => String((item as any).id)}
          extraData={tempSelected}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => {

            return (
              <InfractionCard
                key={item.id}
                title={item.nome_resumo}
                date={item.data}
                tag={item.tags}
                onSelect={() => {
                  setTempSelected((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]));
                }}
                isSelected={tempSelected.includes(item.id)}
                selectMode={true}
              />
            );
          }}
          ListFooterComponent={<View className="h-20" />}
          ListEmptyComponent={<View className="w-full items-center justify-center mt-10 "><Text className="text-xl font-BaiJamJuree_Medium">Você não registrou nenhum auto</Text></View>}
        />

        <View className="py-4 px-6 border-t-2 border-gray-900/10">
              <TouchableOpacity
                onPress={handleConfirm}
                className={cn("py-3 px-6 rounded-lg items-center", tempSelected.length === 0 ? "bg-white border border-green-600" : "bg-green-800 border border-green-800")}
              >
                <Text className={cn(" font-semibold text-lg", tempSelected.length === 0 ? "text-green-600" : "text-white")}>
                  Concluir ({tempSelected.length} selecionados)
                </Text>
              </TouchableOpacity>
            </View>
      </View>);
  }

  return (
    <DefaultModal
      visible={visible}
      onClose={() => setVisible(false)}
      animationType="fade"
    >
     <Modalcontent/>
    </DefaultModal>
  )
}