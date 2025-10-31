import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Este componente é definido como multipla escolha por padrão

interface RadioOption {
  valor: string | boolean;
  nome: string;
}

interface SelectableProps {
  title?: string;
  options: (string | RadioOption)[];
  multiSelect?: boolean;  // define se permite múltiplas seleções
  onSelect?: (selected: (string | boolean)[] | string | boolean | undefined | null) => void;
  showError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function Selectable({ title, options, multiSelect = true, onSelect, showError = false, required = true, disabled = false }: SelectableProps) {
  const [selected, setSelected] = useState<(string | boolean)[] | undefined | null>(undefined);
  const [localError, setLocalError] = useState(false); // Estado local para controlar o erro
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);

  // Função auxiliar para obter valor e nome de uma opção
  const getOptionValue = (option: string | RadioOption): string | boolean => {
    return typeof option === 'string' ? option : option.valor;
  };

  const getOptionDisplay = (option: string | RadioOption): string => {
    return typeof option === 'string' ? option : option.nome;
  };

  useEffect(() => {
    // Notifica o pai ao montar
    onSelect?.(required ? undefined : null);
  }, []);

  useEffect(() => {
    if (disabled && !prevDisabled) {
      onSelect?.(null);
    }
    else if (showError && required && (!selected || (Array.isArray(selected) && selected.length === 0))) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, selected, required]);

  const handlePress = (option: string | RadioOption) => {
    const value = getOptionValue(option);

    if (multiSelect) {
      let newSelected = [];
      if (selected && Array.isArray(selected) && selected.includes(value)) {
        newSelected = selected.filter(item => item !== value);
      } else {
        newSelected = selected && Array.isArray(selected) ? [...selected, value] : [value];
      }
      setSelected(newSelected);
      setLocalError(false);
      if (onSelect) onSelect(newSelected.length === 0 ? (required ? undefined : null) : newSelected);
    } else {
      // Seleção única
      setSelected([value]);
      setLocalError(false);
      if (onSelect) onSelect(value);
    }
  };

  return (
    <View className="mt-2 mb-3">
      <Text className="font-semibold text-xl">{title || "Pergunta"}</Text>
      <Text className={` ${localError ? "text-red-500" : "text-gray-900/70"} font-sans text-md`}>{multiSelect ? "Selecione uma ou mais opções." : "Selecione somente uma opção."}</Text>
      <View className={`mt-2 ${options.length <= 2 && 'flex-row pr-14'}`}>
        {options.map(option => {
          const value = getOptionValue(option);
          const display = getOptionDisplay(option);
          const keyValue = typeof value === 'boolean' ? String(value) : value;

          return (
            <TouchableOpacity
              key={keyValue}
              className="flex-row items-start py-2 px-1.5"
              onPress={() => handlePress(option)}
            >
              <View
                className={`w-5 h-5 mt-0.5 items-center justify-center border-2 border-gray-900/80 rounded-full`}
              >
                {
                  selected && selected.includes(value) &&
                  <View className="w-3 h-3 bg-gray-900/70 rounded-full" />
                }

              </View>
              <Text className="pl-2 font-sans text-lg">{display}</Text>
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}