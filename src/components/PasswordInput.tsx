import { View, Text, TouchableOpacity } from "react-native";
import { Configinput } from "@/src/components/ConfigInput"; // ajuste o caminho se necessário
import images from "@/src/constants/images";
import { useState } from "react";
import { Image } from "expo-image";

interface PasswordInputProps {
  className?: string;
  textHolder?: string;
  label?: string;
  password: string;
  error?: string
  setPassword: (value: string) => void;
}

export function PasswordInput({
  className,
  textHolder,
  label,
  password,
  error,
  setPassword,
}: PasswordInputProps) {

  const [visible, setVisible] = useState(false);

  return (
    <View className="w-full">
      <Text className="w-full text-xl pb-2 font-semibold">{label}</Text>
      <Configinput 
        autoCapitalize="none"
        className={className}
        visible={visible}
        textHolder={textHolder}
        value={password}
        error={error}
        onChangeText={setPassword}
      >
        {visible ? <TouchableOpacity className="h-full justify-center pl-6 " onPress={() => setVisible(!visible)}>
          <Image
            source={images.eyeSlash}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </TouchableOpacity>
          :
          <TouchableOpacity className="h-full justify-center pl-6 " onPress={() => setVisible(!visible)}>
            <Image
              source={images.eye}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </TouchableOpacity>}

      </Configinput>
    </View>
  );
}