import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import Title from "@/src/components/Title";
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
      <View className="flex-1 bg-gray-200">
        <View className="overflow-hidden">
          <Image source={images.fauna} className="w-full h-68" resizeMode="cover" />

          <View className="absolute top-9 w-full flex-row items-center justify-between"> 
             <TouchableOpacity
            className="bg-white/60 w-14 h-14 flex justify-center items-center rounded-br-lg rounded-tr-lg p-2 z-20"
            onPress={() => router.push("/auth/searchPage")}
          >
            <images.leftArrow width={35} height={35} style={{ resizeMode: "contain", opacity: 0.8  }} />
          </TouchableOpacity>
          
           <View
            className=" bg-white/60 h-14 flex justify-center items-center rounded-bl-lg rounded-tl-lg  px-4 py-2 z-20"
          >
            
            <Text className="text-gray-900 text-2xl font-bold">Fauna</Text>
          </View>

          </View>

         


        </View>
        <View
          className="pt-5 pb-10 pl-8 rounded-t-2xl bg-gray-200 -mt-24 z-10"
          >
          <Title>Buscar infrações</Title>
        </View>
        <ScrollView
          className="w-full bg-gray-200"
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          <View className="w-full px-8 gap-4">
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
