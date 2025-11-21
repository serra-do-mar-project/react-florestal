import { View, ScrollView, TouchableOpacity } from "react-native";
import images from "@/src/constants/images";
import Title from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";
import { Card } from "@/src/components/search/Card";
import { useRouter } from "expo-router";
import SearchModal, {searchModalProps} from "@/src/components/search/SearchModal";
import { useState } from "react";

export default function SearchPage() {
  const router = useRouter(); // Hook para redirecionamento
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="flex items-center w-full h-full">
      <View className="w-full h-fit mt-11 pt-3 pl-10">
        <Title>Buscar Infração</Title>
      </View>
      
      <TouchableOpacity className="w-full px-5" onPress={() => setShowModal(true)} >
      <SearchBar data={[]} filterKey={''} onFiltered={() => ''} editable={false} />
      </TouchableOpacity>

      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }} // Centraliza o conteúdo
        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem vertical
      >
        <View className="w-fit h-full pb-5 ">
          <View className="flex-1 flex-row flex-wrap gap-4 w-full px-5 mt-7 items-end justify-start">
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

            <Card
              text="Pesquisa"
              src={images.pesquisa}
              onPress={() => router.push("/auth/search/pesquisa")}
            />
          </View>
        </View>
      </ScrollView>

        <SearchModal visible={showModal} onClose={() => setShowModal(false)}/>
    </View>
  );
}