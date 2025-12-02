import { Alert, Pressable, Text, View } from "react-native";
import images from "@/src/constants/images";
import { router } from "expo-router";
import { useUserStore } from "@/src/store/userStore";
import { Image } from "expo-image";

export function LeavePressable() {
  const { logout } = useUserStore()

  const handleLeave = () => {
    Alert.alert(
      "Sair",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Sim",
          onPress: () => {
            logout(); // Limpa o usuário
            router.replace("/loginPage"); // Redireciona para login
          },
        },
        { text: "Não", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable onPress={handleLeave} className="w-full mt-3.5 border-t border-gray-900/20 ">
      {({ pressed }) => (
        <View
          className={`px-5 flex-row py-4 items-center justify-between w-full transition-all duration-200 ${pressed ? "bg-red-500" : ""
            }`}>
          <Text
            className={`text-2xl font-semibold ${pressed ? "text-white" : "text-gray-900"
              }`}>
            Sair
          </Text>
          <Image
            source={images.leave}
            style={{ width: 22, height: 22 }}
            contentFit="contain"
          />
        </View>
      )}
    </Pressable>
  );
}