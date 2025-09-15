import React, { useEffect, useState } from "react";
import { View, Button, Text, Image } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import images from "@/src/constants/images";

interface DatePickerProps {
  title?: string;
  initialDate?: Date;
  onDateChange?: (date: any) => void;
  mode?: 'date' | 'time';
  showError?: boolean;
  required?: boolean;
  className?: string;
}

export default function DatePicker({ initialDate = new Date(), onDateChange, className, title, mode = 'date', showError = false, required = true }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined | null>(undefined);
  const [pressed, setPressed] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [localError, setLocalError] = useState(false); // Estado local para controlar o erro

   useEffect(() => {
    // Notifica o pai ao montar
    onDateChange?.(required ? undefined : null);
  }, []);

  useEffect(() => {
    if (showError && required && date === undefined) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, date, required]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // fecha no Android
    if (!selectedDate) {
      // Se limpar a seleção
      if (required) {
        setDate(undefined);
        onDateChange?.(undefined);
      } else {
        setDate(null);
        onDateChange?.(null);
      }
      return;
    }
    setDate(selectedDate);
    if (onDateChange) {
      if (mode === 'date') {
        // Envia a data formatada no padrão DD/MM/YYYY (en-GB)
        const formatted = selectedDate.toLocaleDateString('en-GB');
        onDateChange(formatted);
      } else if (mode === 'time') {
        // Envia apenas a hora no formato HH:mm
        const formatted = selectedDate.toLocaleTimeString(["en-GB"], { hour: '2-digit', minute: '2-digit', hour12: false });
        onDateChange(formatted);
      } else {
        onDateChange(selectedDate as any);
      }
    }
  };

  return (
    <View className={`flex-1 mb-4 ${className}`}>

      {title&&
        <Text className={`font-semibold text-xl ml-0.5 mt-1 mb-4`}>{title}</Text>
      }
      <Pressable
        className={`${mode === 'date' ? "w-44" : "w-32"} bg-[#EFEFEF] ${pressed ? "bg-gray-300" : ""} flex-row items-center justify-between  border border-gray-900/30 rounded-md`}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => setShow(true)}
      >
        
          <Text className="font-sans text-lg pb-1 pl-3 pt-2">
           {date
            ? mode === 'date'
            ? date.toLocaleDateString("en-GB")
            : date.toLocaleTimeString(["en-GB"], { hour: '2-digit', minute: '2-digit' })
            : mode === 'date'
            ? "DD/MM/AA"
            : "HH:MM"}
          </Text>
          <View className='border-l px-2 flex-col h-full border-gray-900/30'>

              <View className=" flex-1 justify-center">
                {mode === 'date' ? <images.calendar /> : <images.clock/>}
              </View>
     
          </View>
        
      </Pressable>
       {localError && <Text className="text-red-500 font-sans text-sm mb-3 ml-0.5">{mode == "date"?  "Selecione uma data" : "Selecione um horário"}</Text>}
      

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}
      
    </View>
  );
}