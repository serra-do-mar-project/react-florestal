import { Stack } from "expo-router";
import Tab from "@/src/components/Tab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";

export default function AuthLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="searchPage" options={{ headerShown: false }} />
        <Stack.Screen name="fauna" options={{ headerShown: false }} />
      </Stack>
      <Tab />
    </GestureHandlerRootView>
  );
}