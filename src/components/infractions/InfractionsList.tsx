import { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, FlatList, ActivityIndicator, FlatListProps, RefreshControl } from "react-native";
import InfractionCard from "@/src/components/infractions/InfractionCard";
import { AutosDeInfracao } from "@/src/db/schema";
import { fetchAutos, deleteAutos } from "@/src/hooks/useAutos";
import { cn } from "@/src/lib/utils";

export type InfractionsListProps = {
  onSelect?: (item: AutosDeInfracao) => void;
  onSelectionChange?: () => void;
  pressedMode?: boolean;
  className?: string;
  listFooterComponent?: FlatListProps<AutosDeInfracao>['ListFooterComponent'];
};

export type InfractionsListHandle = {
  refresh: () => Promise<AutosDeInfracao[]>;
  selectAll: () => void;
  clearSelection: () => void;
  getSelected: () => AutosDeInfracao[];
  refreshAndSelectAll: () => Promise<void>;
  deleteSelected: () => Promise<void>;
  isAllSelected: () => boolean;
  getSelectionCount: () => number;
  isInSelectionMode: () => boolean;
};

export const InfractionsList = forwardRef<InfractionsListHandle, InfractionsListProps>(
  ({ onSelect, onSelectionChange, pressedMode, className, listFooterComponent = <View className="h-10" /> }, ref) => {

    const [selectedItems, setSelectedItems] = useState<AutosDeInfracao[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [listData, setListData] = useState<AutosDeInfracao[]>([]);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    // Notifica pai quando seleção muda
    useEffect(() => {
      onSelectionChange?.();
    }, [selectedItems, isSelectionMode]);

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
        deleteSelected: async () => await handleDelete(selectedItems),
        isAllSelected: () => selectedItems.length > 0 && selectedItems.length === listData.length,
        getSelectionCount: () => selectedItems.length,
        isInSelectionMode: () => isSelectionMode || !!pressedMode,
      }),
      [loadAutos, handleSelectAll, resetSelection, selectedItems, handleDelete, listData, isSelectionMode, pressedMode]
    );

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
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={listFooterComponent}
        extraData={selectedItems}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    );
  }
);
