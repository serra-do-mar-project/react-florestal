import images from "@/src/constants/images";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

export interface OptionsBarProps {
  onSelectAll: (selected: boolean) => void;
  cancelOption?: boolean;
  deleteOption?: boolean;
  onCancel: () => void;
  onDelete: () => void;
  numberSelected?: number;
  isAllSelected?: boolean;
}

export default function OptionsBar({ onSelectAll, numberSelected, onCancel, onDelete ,isAllSelected, deleteOption = true, cancelOption = true}: OptionsBarProps) {

  const [selectedAll, setSelectedAll] = useState<boolean>(!!isAllSelected);

  useEffect(() => {
    setSelectedAll(!!isAllSelected);
  }, [isAllSelected]);

  return (

    <View className="flex-1 flex-row h-12 items-center justify-between px-2">
      <Pressable
        className="flex-row items-center h-full"
        onPress={() => (setSelectedAll(!selectedAll), onSelectAll && onSelectAll(!selectedAll))}
      >
        <Text className="text-sm">Todos</Text>
        <View className={`w-4 h-4 border rounded-full ml-1${selectedAll ? " bg-green-600 items-center justify-center" : ""}`} >
          <Image
            source={images.check}
            style={{ width: 8, height: 8 }}
            contentFit="contain"
          />
        </View>
      </Pressable>

      <Text className="font-medium">{numberSelected == 0 ? "Selecionar os items" : numberSelected == 1 ? "1 selecionado" : (numberSelected + " selecionados")}</Text>



      {deleteOption &&
        <TouchableOpacity onPress={() => onDelete()}>
          <Text className="font-medium" >Excluir</Text>
        </TouchableOpacity>
      }

      {cancelOption &&

        <TouchableOpacity onPress={() => (onCancel && onCancel())}>
          <Text className="font-medium" >Cancelar</Text>
        </TouchableOpacity>
      }

    </View>
  );


}