import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, ScrollView } from "react-native";
import Title from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";
import Dropdown from "@/src/components/Dropdown";
import { useRouter } from "expo-router";
import images from "@/src/constants/images";

export default function AuthLayout() {
    const router = useRouter();

    const data = [
      {title: "Captura de Animais Silvestres"},
      {title: "Comércio ilegal de fauna"},
      {title: "Introdução de espécies exóticas"},
      {title: "Maus-tratos a animais"},
      {title: "Poluição de ambientes naturais"},
      {title: "Abate Ilegal de Animais Silvestres"},
      {title: "Captura de Animais Silvestres"},
      {title: "Comércio ilegal de fauna"},
      {title: "Introdução de espécies exóticas"},
      {title: "Maus-tratos a animais"},
      {title: "Poluição de ambientes naturais"},
      {title: "Abate Ilegal de Animais Silvestres"},
      {title: "Captura de Animais Silvestres"},
      {title: "Comércio ilegal de fauna"},
      {title: "Introdução de espécies exóticas"},
      {title: "Maus-tratos a animais"},
      {title: "Poluição de ambientes naturais"},
      {title: "Abate Ilegal de Animais Silvestres"},
    ]

    return (
      <View className="flex-1 bg-F6F5F5 items-center w-full">
        <Image source={images.fauna} className="w-full h-60" resizeMode="cover" />
        <View className="pt-2">
          <Title>Guia - Fauna</Title>
        </View>

        <ScrollView
          className="w-full mt-1"
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          <View className="w-full px-8 gap-3">
            {data.map((item, index) => (
              <Dropdown
                key={index}
                title={item.title}
                tag="hi,hello"
                onPress={() => router.push("/auth/fauna")}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
}