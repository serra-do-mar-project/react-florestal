import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Este componente é definido como multipla escolha por padrão

interface SelectableProps {
  title?: string;
  options: string[];
  multiSelect?: boolean ;  // define se permite múltiplas seleções
  onSelect?: (selected: string[] | string) => void;
}

export default function Selectable({ title, options, multiSelect = true, onSelect }: SelectableProps) {
  const [selected, setSelected] = useState<string[]>([]); 

  const handlePress = (option: string) => {
    if (multiSelect) {
      // Múltiplas seleções
      let newSelected = [];
      if (selected.includes(option)) {
        newSelected = selected.filter(item => item !== option);
      } else {
        newSelected = [...selected, option];
      }
      setSelected(newSelected);
      onSelect?.(newSelected);
    } else {
      // Seleção única
      setSelected([option]);
      onSelect?.(option);
    }
  };

  return (
    <View className="mt-5">
      <Text className="font-semibold text-xl">{title || "Pergunta"}</Text>
      <Text className="text-gray-800 text-sm">{multiSelect? "Selecione uma ou mais opções." : "Selecione somente uma opção."}</Text>
      <View className="mt-2">
        {options.map(option => (
          <TouchableOpacity
            key={option}
            className="flex-row items-center py-2 px-4"
            onPress={() => handlePress(option)}
          >
            <View
              className={`w-5 h-5 border-2 border-gray-900/80 rounded-full ${
                selected.includes(option) ? "bg-gray-900/70" : ""
              }`}
            />
            <Text className="pl-2 pt-1 font-sans text-lg">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
