import images from "@/src/constants/images";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {ChangePassword }from "@/src/components/ChangePassword"; // ajuste o caminho se necessário
import { SubmitButton } from "@/src/components/SubmitButton";
import { LeavePressable } from "@/src/components/LeavePressable";

export default function ConfigPage() {
  const [isSelected, setIsSelected] = useState(false);
  const [password, setPassword] = useState("");      // Estado para senha
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 


  function handleChangePassword() {
    if((newPassword || password) == ""){
      alert("os campos devem ser preenchidos");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    if (newPassword.length < 5) {
      alert("A nova senha deve ter pelo menos 5 caracteres.");
      return;
    }
    // Aqui você pode adicionar a lógica para atualizar a senha
    alert("Senha atualizada com sucesso!");
  }

  return (
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Configurações</Text>
      </View>

    <View className="w-full mt-6 flex-row border-b border-gray-900/5 shadow shadow-black">
      <View className="w-32 h-32 justify-center bg-[#57714A]">
        <images.userConfig  width={110} height={100} style={{ resizeMode: "contain",}}/>
      </View>
      <View className="flex-1 h-32 pl-5 pr-3 justify-center items-center bg-white">
          <View className="min-w-60">
            <Text className="text-2xl font-normal text-gray-900 mb-1">Nome de Usuário</Text>
            <Text className="text-xl font-light text-gray-900 mb-1">guarda florestal </Text>
          </View>
          
      </View> 
    </View>

    <ScrollView className="" contentContainerStyle={{ flexGrow: 1 }}>
    <Pressable className={`w-full items-center justify-between flex-row mt-7 px-5 pb-4 ${isSelected ? "pb-0" : "border-b border-gray-900/20"}`} onPress={() => {
        setIsSelected(!isSelected)}}>
    <Text className="text-2xl font-medium text-gray-900 " >Alterar senha</Text>
    <Image
      source={images.arrow}
      className={`w-6 h-6 transition-transform duration-500 ${isSelected ? "rotate-180 " : ""}`}
      resizeMode="contain"
      tintColor="black"
    />
    </Pressable>
      {isSelected && (
    <View className="px-5 transition-all duration-500 overflow-hidden opacity-100">
      <Text className="w-full px-0.5">
        lembre-se, a nova senha deve ser forte e única.
      </Text>

      <View className="items-center w-full mt-5 px-3">
        <ChangePassword
          password={password}
          setPassword={setPassword}
          label="Senha atual"
        />

        <ChangePassword
          password={newPassword}
          setPassword={setNewPassword}
          label="Senha nova"
        />

        <ChangePassword
          password={confirmPassword}
          setPassword={setConfirmPassword}
          label="Confirmar nova senha"
        />

        <SubmitButton
          classname="h-[3rem] w-[7rem] mt-8 mb-10"
          textClass="text-xl"
          title="Salvar"
          onPress={handleChangePassword}
        />
      </View>
    </View>
  )}

      <View className={`${isSelected ? "mt-6" : "mt-[85%]"} mb-5`} >
      <LeavePressable/>
      </View>
      </ScrollView>
      
    </View>
  );
}