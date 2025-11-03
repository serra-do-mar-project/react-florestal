import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { View, FlatList } from "react-native";
import InfractionCard from "@/src/components/infractions/InfractionCard";
import OptionsBar from "@/src/components/infractions/OptionsBar";
import { AutosDeInfracao } from "@/src/db/schema";
import { fetchAutos, deleteAutos } from "@/src/hooks/useAutos";

export type InfractionsListProps = {
  onSelect?: (item: AutosDeInfracao) => void;
  pressedMode?: boolean;
  cancelOption?: boolean;
  deleteOption?: boolean;
  onSelectChange?: (ids: number[]) => void;
};

export type InfractionsListHandle = {
  refreshFromParent: () => Promise<void>;
  selectAllByDefault: () => void;
  refreshAndSelectAll: () => Promise<void>;
};

export const InfractionsList = forwardRef<InfractionsListHandle, InfractionsListProps>(
  ({ onSelect, pressedMode, cancelOption = true, deleteOption = true, onSelectChange }, ref) => {

    // -------------------------------
    // Estados
    // -------------------------------
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [listData, setListData] = useState<AutosDeInfracao[]>([]);

    // -------------------------------
    // Funções principais
    // -------------------------------
    const loadAutos = useCallback(async () => {
      try {
        const autos = await fetchAutos();
        setListData(autos);
        return autos;
      } catch (err) {
        console.error("Erro ao carregar autos:", err);
        setListData([]);
        return [] as AutosDeInfracao[];
      }
    }, []);

    const handleDelete = useCallback(async (ids: number[]) => {
      await deleteAutos(ids);
      resetSelection();
      await loadAutos();
    }, [loadAutos]);

    const handleSelectAll = useCallback((value: boolean) => {
      setSelectAll(value);
      setSelectedIds(value ? listData.map((item) => item.id) : []);
    }, [listData]);

    const resetSelection = useCallback(() => {
      setIsSelectionMode(false);
      setSelectAll(false);
      setSelectedIds([]);
    }, []);

    // -------------------------------
    // Comunicação com componente pai via ref
    // -------------------------------
    useImperativeHandle(ref, () => ({
      refreshFromParent: async () => {
        await loadAutos();
      },
      selectAllByDefault: () => {
        handleSelectAll(true);
      },
      refreshAndSelectAll: async () => {
        const autos = await loadAutos();
        const ids = autos.map((a) => a.id);
        setSelectedIds(ids);
        setSelectAll(ids.length > 0);
      },
    }), [loadAutos, handleSelectAll]);

    // -------------------------------
    // Atualiza o pai quando seleção muda
    // -------------------------------
    useEffect(() => {
      onSelectChange?.(selectedIds);
    }, [selectedIds, onSelectChange]);

    // -------------------------------
    // Cabeçalho com barra de opções
    // -------------------------------
    const renderHeader = () => (
      <View className="mb-2 mt-4">
        {(isSelectionMode || pressedMode) && (
          <OptionsBar
            deleteOption={deleteOption}
            cancelOption={cancelOption}
            onSelectAll={handleSelectAll}
            numberSelected={selectedIds.length}
            onCancel={resetSelection}
            isAllSelected={
              selectedIds.length > 0 &&
              selectedIds.length === listData.length
            }
            onDelete={() => handleDelete(selectedIds)}
          />
        )}
      </View>
    );

    // -------------------------------
    // Renderiza cada card de infração
    // -------------------------------
    const renderItem = ({ item }: { item: AutosDeInfracao }) => (
      <InfractionCard
        key={item.id}
        title={item.nome_resumo}
        date={item.data}
        tag={item.tags}
        onPress={() => onSelect?.(item)}
        onSelect={() => {
          setSelectedIds((prev) =>
            prev.includes(item.id)
              ? prev.filter((x) => x !== item.id)
              : [...prev, item.id]
          );
        }}
        isSelected={selectedIds.includes(item.id)}
        selectMode={pressedMode || isSelectionMode || selectAll}
        onlongPress={() => {
          setIsSelectionMode(true);
          setSelectedIds((prev) =>
            prev.includes(item.id) ? prev : [...prev, item.id]
          );
        }}
      />
    );

    // -------------------------------
    // Render principal
    // -------------------------------
    return (
      <FlatList
        data={listData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        className="w-full"
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={<View className="h-10" />}
      />
    );
  }
);
