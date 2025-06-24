import { View, Text, TouchableOpacity } from "react-native";
import { Configinput } from "@/src/components/ConfigInput"; // ajuste o caminho se necessário
import images from "@/src/constants/images";

interface ChangePasswordProps {
  label?: string;
  password: string;
  setPassword: (value: string) => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export function ChangePassword({
  label,
  password,
  setPassword,
  visible,
  setVisible,
}: ChangePasswordProps) {
  return (
    <View className="w-96">
      <Text className="w-full text-xl pb-2 font-medium">{label}</Text>
      <Configinput
        visible={visible}
        textHolder=""
        value={password}
        onChangeText={setPassword}
      >
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <images.lock width={24} height={24} />
        </TouchableOpacity>
      </Configinput>
    </View>
  );
}