import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DatePicker from "./DatePicker";

interface DateTimePickerProps {
  title?: string;
  onDateChange?: (dates: (string | undefined)[]) => void;
  mode?: 'date' | 'time';
  showError?: boolean;
  required?: boolean;
}

export default function DateTimePicker({ onDateChange, title, mode = 'date', showError = false, required = true }: DateTimePickerProps) {
  // internal values for date and time (strings or undefined)
  const [dateValue, setDateValue] = useState<string | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>(undefined);
  const [localError, setLocalError] = useState<boolean>(false);

  const handle = onDateChange ?? (() => {});

  // update local error state when relevant inputs change
  useEffect(() => {
    if (showError && required && (!dateValue || !timeValue)) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  }, [showError, required, handle]);

  const handleDateChange = (val: any) => {
    
    setDateValue(val);
    handle([val, timeValue]);
  };

  const handleTimeChange = (val: any) => {
    
    setTimeValue(val);
    handle([dateValue, val]);
  };

  return (

    <View className="w-full my-1.5">
      <Text className={`font-semibold text-xl ml-0.5 mt-1`}>{title}</Text>
      {localError && <Text className="text-red-500 font-sans text-sm ml-0.5">{mode == "date"?  "Selecione uma data" : "Selecione um horário"}</Text>}
      <View className="h-fit w-full flex-row items-end mt-2">

        <DatePicker
          className="w-44 mr-2"
          onDateChange={handleDateChange}
        />

        <DatePicker
          className="w-32"
          mode="time"
          onDateChange={handleTimeChange}
        />

      </View>
    </View>
  );
}