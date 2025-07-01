import { View, Text, TouchableOpacity } from "react-native";
import { Configinput } from "@/src/components/ConfigInput"; // ajuste o caminho se necessário
import images from "@/src/constants/images";
import { useState } from "react";

interface DataInputProps {
  label?: string;
  data: string;
  setData: (value: string) => void;
}

export function DataInput({
  label,
  data,
  setData,
}:  DataInputProps) {  
  
  const [visible, setVisible] = useState(true);

  return (
    <View className="w-96">
      
      <Text className="w-full text-xl pb-2 font-medium">{label}</Text>
      <Configinput
        textHolder=""
        value={data}
        onChangeText={setData}
      />

    </View>
  );
}