import React, { useState } from "react";
import { View, Button, Text, Image } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import images from "@/src/constants/images";

interface DatePickerProps {
  title?: string;
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  mode?: 'date' | 'time';
}

export default function DatePicker({ initialDate = new Date(), onDateChange, title, mode = 'date' }: DatePickerProps) {
  const [date, setDate] = useState<Date>(initialDate);
  const [pressed, setPressed] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

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
    <View className="w-full py-3" >

      {title&&
        <Text className='font-semibold text-xl ml-1 mb-2'>{title}</Text>
      }
      <Pressable
        className={`${mode === 'date' ? "w-44" : "w-28"} bg-[#EFEFEF] ${pressed ? "bg-gray-300" : ""} py-1 pt-1.5 border border-gray-900/30 rounded-md`}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => setShow(true)}
      >
        <View className="flex-1 flex-row items-center justify-between px-3">
          <Text className="font-sans text-lg">
            {mode === 'date' ? date.toLocaleDateString() : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <images.calendar />
        </View>
      </Pressable>
      

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
