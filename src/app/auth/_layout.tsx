import { Stack } from "expo-router";
import { View, Image, Text } from "react-native";
import Tab from "@/src/components/Tab";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (

      <>
    
        <Stack
          screenOptions={{
            headerShown: false, // Oculta o cabeçalho padrão
            contentStyle: {
              backgroundColor: "#F6F5F5",
            },
          }}
        />

        <Tab/>

      </>
  );
}