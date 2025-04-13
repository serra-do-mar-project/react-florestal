import { Stack } from "expo-router";
import { View, Image, Text } from "react-native";
import Tab from "@/src/components/Tab";

export default function AuthLayout() {
  return (
    <View className="w-screen h-screen bg-gray-200">
        <Stack
          screenOptions={{
            headerShown: false, // Oculta o cabeçalho padrão
            contentStyle: {
              backgroundColor: "white", // Garante que o fundo do Stack seja branco
            },
          }}
        />

        <Tab/>
    </View>
  );
}