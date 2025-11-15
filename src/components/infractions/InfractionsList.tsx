import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { View, FlatList, ActivityIndicator, FlatListProps, RefreshControl } from "react-native";
import InfractionCard from "@/src/components/infractions/InfractionCard";
import OptionsBar from "@/src/components/infractions/OptionsBar";
import { AutosDeInfracao } from "@/src/db/schema";
import { fetchAutos, deleteAutos } from "@/src/hooks/useAutos";
import { cn } from "@/src/lib/utils";

export type InfractionsListProps = {
  onSelect?: (item: AutosDeInfracao) => void;
  pressedMode?: boolean;
  cancelOption?: boolean;
  deleteOption?: boolean;
  className?: string;
  listFooterComponent?: FlatListProps<AutosDeInfracao>['ListFooterComponent'];
};

export type InfractionsListHandle = {
  refresh: () => Promise<AutosDeInfracao[]>;
  selectAll: () => void;
  clearSelection: () => void;
  getSelected: () => AutosDeInfracao[];
  refreshAndSelectAll: () => Promise<void>;
};

export const InfractionsList = forwardRef<InfractionsListHandle, InfractionsListProps>(
  ({ onSelect, pressedMode, cancelOption = true, deleteOption = true, className, listFooterComponent = <View className="h-10" /> }, ref) => {

    const [selectedItems, setSelectedItems] = useState<AutosDeInfracao[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [listData, setListData] = useState<AutosDeInfracao[]>([]);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    // -------------------------------
    // Funções principais
    // -------------------------------
    const loadAutos = useCallback(async () => {
      setLoading(true);
      const autos = await fetchAutos();
      setListData(autos);
      setLoading(false);
      return autos;
    }, [refreshing]);

    const handleDelete = useCallback(
      async (items: AutosDeInfracao[]) => {
        const ids = items.map((i) => i.id);
        await deleteAutos(ids);
        resetSelection();
        await loadAutos();
      },
      [loadAutos]
    );

    const handleSelectAll = useCallback(
      (value: boolean) => {
        if (value && listData.length > 0) {
          setSelectedItems([...listData]);
          setIsSelectionMode(true);
        } else {
          setSelectedItems([]);
          setIsSelectionMode(false);
        }
      },
      [listData]
    );

    const resetSelection = useCallback(() => {
      setSelectedItems([]);
      setIsSelectionMode(false);
    }, []);

    // -------------------------------
    // Métodos disponíveis para o pai
    // -------------------------------
    useImperativeHandle(
      ref,
      () => ({
        refresh: loadAutos,
        refreshAndSelectAll: async () => {
          const autos = await loadAutos();
          setSelectedItems([...autos]);
          setIsSelectionMode(autos.length > 0);
        },
        selectAll: () => handleSelectAll(true),
        clearSelection: resetSelection,
        getSelected: () => selectedItems,
      }),
      [loadAutos, handleSelectAll, resetSelection, selectedItems]
    );

    // -------------------------------
    // Cabeçalho com barra de opções
    // -------------------------------
    const renderHeader = () => {
      const isAllSelected =
        selectedItems.length > 0 && selectedItems.length === listData.length;

      if (!(isSelectionMode || pressedMode)) return null;

      return (
        <View className="mb-2">
          <OptionsBar
            deleteOption={deleteOption}
            cancelOption={cancelOption}
            onSelectAll={() => handleSelectAll(!isAllSelected)}
            numberSelected={selectedItems.length}
            onCancel={resetSelection}
            isAllSelected={isAllSelected}
            onDelete={() => handleDelete(selectedItems)}
          />
        </View>
      );
    };

    // -------------------------------
    // Renderiza cada card
    // -------------------------------
    const renderItem = useCallback(
      ({ item }: { item: AutosDeInfracao }) => {
        const isSelected = selectedItems.some((i) => i.id === item.id);

        const toggleSelect = () => {
          setSelectedItems((prev) =>
            prev.some((i) => i.id === item.id)
              ? prev.filter((x) => x.id !== item.id)
              : [...prev, item]
          );
        };

        const handleLongPress = () => {
          setIsSelectionMode(true);
          setSelectedItems((prev) =>
            prev.some((i) => i.id === item.id) ? prev : [...prev, item]
          );
        };

        return (
          <InfractionCard
            title={item.nome_resumo}
            date={item.data}
            tag={item.tags}
            onPress={() => onSelect?.(item)}
            onSelect={toggleSelect}
            onlongPress={handleLongPress}
            isSelected={isSelected}
            selectMode={pressedMode || isSelectionMode}
          />
        );
      },
      [selectedItems, isSelectionMode, pressedMode, onSelect]
    );

    // -------------------------------
    // Render principal
    // -------------------------------
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center mt-10">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={listData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        className={cn("w-full", className)}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={listFooterComponent}
        extraData={selectedItems}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    );
  }
);
