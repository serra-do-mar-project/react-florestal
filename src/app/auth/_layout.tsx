import { Stack } from "expo-router";
import { View, Image, Text } from "react-native";
import Tab from "@/src/components/Tab";

export default function AuthLayout() {
  return (
    <View className="w-screen h-screen ">
        <Stack
          screenOptions={{
            headerShown: false, // Oculta o cabeçalho padrão
            contentStyle: {
              backgroundColor: "#F6F5F5",
            },
          }}
        />

        <Tab/>
    </View>
  );
}