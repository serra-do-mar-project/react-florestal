import { View, ScrollView } from "react-native";
import images from "@/src/constants/images";
import Title from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";
import { Card } from "@/src/components/Card";
import { useRouter } from "expo-router";

export default function SearchPage() {
  const router = useRouter(); // Hook para redirecionamento

  return (
    <View className="flex items-center w-full h-full">
      <View className="w-full h-fit mt-11 pt-3 pl-10">
        <Title>Buscar Infração</Title>
      </View>

      <SearchBar />

      <ScrollView
        className="w-full"
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }} // Centraliza o conteúdo
        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem vertical
      >
        <View className="w-fit pb-5">
          <View className="flex-1 flex-row flex-wrap gap-4 w-full px-5 mt-7 justify-start">
            <Card
              text="Fauna"
              src={images.fauna}
              onPress={() => router.push("/auth/search/fauna")}
            />
            <Card
              text="Flora"
              src={images.flora}
              onPress={() => router.push("/auth/search/flora")}
            />
            <Card
              text="Construção"
              src={images.construcao}
              onPress={() => router.push("/auth/search/construcao")}
            />
            <Card
              text="Uso Público"
              src={images.usoPublico}
              onPress={() => router.push("/auth/search/usoPublico")}
            />
            <Card
              text="Mineração"
              src={images.mineracao}
              onPress={() => router.push("/auth/search/mineracao")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}