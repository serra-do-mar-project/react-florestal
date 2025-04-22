import { View, Image, ScrollView } from "react-native";
import Title from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";
import NavButton from "@/src/components/NavButton";
import { useRouter } from "expo-router";
import images from "@/src/constants/images";

export default function FaunaGuide() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center w-full">
      <Image source={images.fauna} className="w-full h-40" resizeMode="cover" />

      <View className="flex-1 items-center w-full px-6 pt-5">
        <Title>Guia - Fauna</Title>
        <SearchBar />
      </View>

      <ScrollView
        className="w-full mt-2"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-8 gap-3 mt-4">
          <NavButton title="Captura ilegal de animais silvestres" onPress={() => {}} />
          <NavButton title="Comércio ilegal de fauna" onPress={() => {}} />
          <NavButton title="Introdução de espécies exóticas" onPress={() => {}} />
          <NavButton title="Maus-tratos a animais" onPress={() => {}} />
          <NavButton title="Poluição de ambientes naturais" onPress={() => {}} />
          <NavButton title="Abate Ilegal de Animais Silvestres" onPress={() => {}} />
          <NavButton title="Abate Ilegal de Animais Silvestres" onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  );
}
