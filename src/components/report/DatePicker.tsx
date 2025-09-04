import React, { useEffect, useState } from "react";
import { View, Button, Text, Image } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import images from "@/src/constants/images";

interface DatePickerProps {
  title?: string;
  initialDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  mode?: 'date' | 'time';
  showError?: boolean;
}

export default function DatePicker({ initialDate = new Date(), onDateChange, title, mode = 'date', showError =false }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [pressed, setPressed] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [localError, setLocalError] = useState(false); // Estado local para controlar o erro
  

   useEffect(() => {
      onDateChange?.(date);
    }, []);

    useEffect(() => {
  if (showError && date == undefined) {
    setLocalError(true);
  } else {
    setLocalError(false);
  }
}, [showError, date]); 

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // fecha no Android
    if (selectedDate) {
      setDate(selectedDate);
      if (onDateChange) {
        if (mode === 'date') {
          // Envia apenas a data no formato yyyy-mm-dd
          const formatted = selectedDate.toISOString().split('T')[0];
          onDateChange(formatted as any);
        } else if (mode === 'time') {
          // Envia apenas a hora no formato HH:mm
          const formatted = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          onDateChange(formatted as any);
        } else {
          onDateChange(selectedDate);
        }
      }
    }
  };

  return (
    <View className="w-full my-3" >

      {title&&
        <Text className={`font-semibold text-xl ml-0.5 ${localError? "" : "mb-3"}`}>{title}</Text>
      }
      {localError && <Text className="text-red-500 font-sans text-sm mb-3 ml-0.5">{mode == "date"?  "Selecione uma data" : "Selecione um horário"}</Text>}
      <Pressable
        className={`${mode === 'date' ? "w-44" : "w-28"} bg-[#EFEFEF] ${pressed ? "bg-gray-300" : ""} flex-row items-center justify-between  border border-gray-900/30 rounded-md`}
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
          <View className='border-l px-2.5 flex-col h-full border-gray-900/30'>
              <View className=" flex-1 justify-center">
                <images.calendar />
              </View>
              
                        
          </View>
          
        
      </Pressable>
      

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