import images from "@/src/constants/images";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Pressable, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import { PasswordInput } from "@/src/components/PasswordInput"; // ajuste o caminho se necessário
import { SubmitButton } from "@/src/components/SubmitButton";
import { LeavePressable } from "@/src/components/configuration/LeavePressable";
import { useUserStore } from "@/src/store/userStore";
import { ChangeOwnPassword } from "@/src/lib/utils";

export default function ConfigPage() {
  const [isSelected, setIsSelected] = useState(false);
  const [password, setPassword] = useState("");      // Estado para senha
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { nome, tipo, id, token } = useUserStore()


  async function handleChangePassword() {
    if ((newPassword || password) == "") {
      Alert.alert("Atenção","os campos devem ser preenchidos");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro de confirmação","As senhas não coincidem.");
      return;
    }
    if (newPassword.length < 5) {
      Alert.alert("Senha inválida","A nova senha deve ter pelo menos 5 caracteres");
      return;
    }

    if (token && id) {
      const result = await ChangeOwnPassword(token, password, newPassword, id)
      if (result.status === "success") {
        setIsSelected(false)
        setPassword("")
        setNewPassword("")
        setConfirmPassword("")
        Alert.alert("Sucesso","Senha alterada com sucesso!");
      }
      else{
        Alert.alert("Erro", result.message)
      }

    }
  }

  return (
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-7 pb-5 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Configurações</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

      <View className="w-full mt-6 flex-row border-b border-gray-900/5 shadow shadow-black">
        <View className="w-32 h-32 justify-center bg-[#57714A]">
          <Image source={images.userConfig} style={{ width: 110, height: 100 }} contentFit="contain" />
        </View>
        <View className="flex-1 h-32 pl-5 pr-3 justify-center items-center bg-white">
          <View className="min-w-60">
            <Text className="text-2xl font-sans text-gray-900 mb-1">{nome}</Text>
            <Text className="text-xl font-sans text-gray-900/80 mb-1">{tipo} </Text>
          </View>

        </View>
      </View>

      
        <Pressable className={`w-full items-center justify-between flex-row mt-7 px-5 pb-4 ${isSelected ? "pb-0" : "border-b border-gray-900/20"}`} onPress={() => {
          setIsSelected(!isSelected)
        }}>
          <Text className="text-2xl font-semibold text-gray-900 " >Alterar senha</Text>
          <Image
            source={images.arrow}
            style={{ 
              width: 22, 
              height: 22,
              transform: [{ rotate: isSelected ? '180deg' : '0deg' }] 
            }}
            contentFit="contain"
            tintColor="black"
          />
        </Pressable>
        {isSelected && (
          <View className="px-5 transition-all duration-500 overflow-hidden opacity-100">
            <Text className="w-full font-sans px-0.5">
              lembre-se, a nova senha deve ser forte e única.
            </Text>

            <View className="items-center w-full mt-5 px-3 gap-4">
              <PasswordInput
                password={password}
                setPassword={setPassword}
                label="Senha atual"
              />

              <PasswordInput
                password={newPassword}
                setPassword={setNewPassword}
                label="Senha nova"
              />

              <PasswordInput
                password={confirmPassword}
                setPassword={setConfirmPassword}
                label="Confirmar nova senha"
              />

              <SubmitButton
                classname="h-fit w-3/4 py-2 mt-8 mb-10"
                textClass="text-xl"
                title="Salvar"
                onPress={handleChangePassword}
              />
            </View>
          </View>
        )}

        <View className={`${isSelected ? "mt-6" : "mt-[85%]"} mb-5`} >
          <LeavePressable />
        </View>
      </ScrollView>
    </View>
  );
}
