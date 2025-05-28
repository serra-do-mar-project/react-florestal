import { Stack } from "expo-router";
import { View, Image, Text } from "react-native";
import Tab from "@/src/components/Tab";

import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="searchPage" options={{headerShown: false}}/>
        <Stack.Screen name="fauna" options={{headerShown: false}}/>
      </Stack>
      <Tab/>
    </>
  );
}