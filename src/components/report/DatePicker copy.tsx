import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface DatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

export default function DatePicker({ initialDate = new Date(), onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<Date>(initialDate);
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // fecha no Android
    if (selectedDate) {
      setDate(selectedDate);
      if (onDateChange) {
        onDateChange(selectedDate); // dispara para o componente pai
      }
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ marginBottom: 5 }}>Selecionado: {date.toLocaleString()}</Text>
      <Button title="Selecionar Data" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={date}
          mode="date" // pode trocar para "time"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
