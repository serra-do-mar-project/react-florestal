import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Este componente é definido como multipla escolha por padrão

interface SelectableProps {
  title?: string;
  options: string[];
  multiSelect?: boolean ;  // define se permite múltiplas seleções
  onSelect?: (selected: string[] | string | undefined | null) => void;
  showError?: boolean;
  required?: boolean;
}
 
export default function Selectable({ title, options, multiSelect = true, onSelect, showError = false, required = true }: SelectableProps) {
  const [selected, setSelected] = useState<string[] | undefined | null>(undefined);
  const [localError, setLocalError] = useState(false); // Estado local para controlar o erro

  useEffect(() => {
    // Notifica o pai ao montar
    onSelect?.(required ? undefined : null);
  }, []);

  useEffect(() => {
    if (showError && required && (!selected || (Array.isArray(selected) && selected.length === 0))) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, selected, required]);

  const handlePress = (option: string) => {
    if (multiSelect) {
      let newSelected = [];
      if (selected && Array.isArray(selected) && selected.includes(option)) {
        newSelected = selected.filter(item => item !== option);
      } else {
        newSelected = selected && Array.isArray(selected) ? [...selected, option] : [option];
      }
      setSelected(newSelected);
      setLocalError(false);
      if (onSelect) onSelect(newSelected.length === 0 ? (required ? undefined : null) : newSelected);
    } else {
      // Seleção única
      setSelected([option]);
      setLocalError(false);
      if (onSelect) onSelect(option);
    }
  };

  return (
    <View className="mt-2 mb-3">
      <Text className="font-semibold text-xl">{title || "Pergunta"}</Text>
      <Text className={` ${localError? "text-red-500" : "text-gray-900/70"} font-sans text-md`}>{multiSelect? "Selecione uma ou mais opções." : "Selecione somente uma opção."}</Text>
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
