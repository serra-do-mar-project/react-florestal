import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Este componente é definido como multipla escolha por padrão

interface SelectableProps {
  title?: string;
  options: string[];
  multiSelect?: boolean ;  // define se permite múltiplas seleções
  onSelect?: (selected: string[] | string | undefined) => void;
  showError?: boolean;
}
 
export default function Selectable({ title, options, multiSelect = true, onSelect, showError = false }: SelectableProps) {

  const [selected, setSelected] = useState<string[] | undefined>(undefined);
  const [localError, setLocalError] = useState(false); // Estado local para controlar o erro
  
  
  useEffect(() => {
    onSelect?.(selected);
  }, []);

  useEffect(() => {
    if (showError && (!selected || (Array.isArray(selected) && selected.length === 0))) {
      setLocalError(true);
    }
  }, [showError, selected]); 


  const handlePress = (option: string) => {
    if (multiSelect) {
      let newSelected = [];
      if (selected && selected.includes(option)) {
        newSelected = selected.filter(item => item !== option);
      } else {
        newSelected = selected ? [...selected, option] : [option];
      }
      setSelected(newSelected);
      setLocalError(false);
      onSelect?.(newSelected.length === 0 ? undefined : newSelected);
    } else {
      // Seleção única
      setSelected([option]);
      setLocalError(false);
      onSelect?.(option);
    }
  };

  return (
    <View className="mt-5">
      <Text className="font-semibold text-xl">{title || "Pergunta"}</Text>
      <Text className={` ${localError? "text-red-500" : "text-gray-800"} font-sans text-sm`}>{multiSelect? "Selecione uma ou mais opções." : "Selecione somente uma opção."}</Text>
      <View className="mt-2">

        {options.map(option => (
          <TouchableOpacity
            key={option}
            className="flex-row items-center py-2 px-1.5"
            onPress={() => handlePress(option)}
          >
            <View
              className={`w-5 h-5 items-center justify-center border-2 border-gray-900/80 rounded-full`}
            >
              {
                selected && selected.includes(option)&& 
                <View className="w-3 h-3 bg-gray-900/70 rounded-full"/>
              
              }

            </View>
            <Text className="pl-2 pt-1 font-sans text-lg">{option}</Text>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
}
