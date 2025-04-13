import { View } from "react-native";
import { TabButton } from "./TabButton";
import images from "@/src/constants/images";
import { usePathname, useRouter } from "expo-router"; // Use o hook useRouter


export default function Tab() {
  const router = useRouter(); // Obtenha o roteador usando o hook
  const pathname = usePathname(); // Obtenha o caminho atual
  
  return (
    <View className="w-full flex flex-row h-24 border border-green-100">
      <TabButton text="Pesquisa" 
        onPress={() => router.push("/auth/searchPage")}
         isActive={pathname === "/auth/searchPage"} 
        >
        <images.search width={24} height={24} stroke="black" strokeWidth={0.5} />
      </TabButton>

      <TabButton text="Relatório" 
        onPress={() => router.push("/")}
        isActive={pathname === "/auth/"} 
      >
        <images.note width={24} height={24} stroke="black" strokeWidth={0.5} />
      </TabButton>

      <TabButton text="Configurações" 
        onPress={() => router.push("/")}
        isActive={pathname === "/auth/"}
        >
        <images.settings width={24} height={24} stroke="black" strokeWidth={0.5} />
      </TabButton>
    </View>
  );
}