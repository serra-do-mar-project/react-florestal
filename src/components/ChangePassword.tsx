import { View, Text, TouchableOpacity } from "react-native";
import { Configinput } from "@/src/components/ConfigInput"; // ajuste o caminho se necessário
import images from "@/src/constants/images";
import { useState } from "react";

interface ChangePasswordProps {
  label?: string;
  password: string;
  setPassword: (value: string) => void;
}

export function ChangePassword({
  label,
  password,
  setPassword,
}: ChangePasswordProps) {  
  
  const [visible, setVisible] = useState(true);

  return (
    <View className="w-96">
      <Text className="w-full text-xl pb-2 font-medium">{label}</Text>
      <Configinput
        visible={visible}
        textHolder=""
        value={password}
        onChangeText={setPassword}
      >
       {visible ? <TouchableOpacity onPress={() => setVisible(!visible)}>
        <images.eyeSlash width={24} height={24} />
        </TouchableOpacity>
          :  
       <TouchableOpacity onPress={() => setVisible(!visible)}>
          <images.eye width={24} height={24} />
        </TouchableOpacity>}

      </Configinput>
    </View>
  );
}