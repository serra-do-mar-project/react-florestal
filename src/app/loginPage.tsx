'use client'

import { View, Image, TouchableOpacity, Keyboard, Text, KeyboardAvoidingView, Platform,} from "react-native";
import images from '../constants/images'
import Title from "../components/Title";
import { FullWindowOverlay } from "react-native-screens";
import { Logininput } from "../components/Logininput";
import { SubmitButton } from "../components/SubmitButton";
import React, { useEffect, useState } from "react";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../lib/utils";
import { useUserStore } from "../store/userStore";




export default function loginPage() {
  const router = useRouter();
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [error, setError] = useState("")

  const { login: userLogin } = useUserStore()

  useEffect(() => {
    if (error != "") setError("")
  }, [password, CPF])

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (CPF == "" || password == "") {
      setError("CPF e senha precisam estar preenchidos")
      return
    }

    const data = await login(CPF, password)
    if (data?.status === "success" && data.user && data.token) {
      console.log(data.user)
      userLogin(data.user.id, data.user.nome, data.user.tipo, data.token);
      router.replace("/auth/search")
    } else {
      setError(data?.message || "Erro desconhecido");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 items-center justify-between"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className={`flex items-center w-full h-20 mt-5`} >
          <Title>
            <Text >Seja Bem-Vindo(a)</Text>        
          </Title>
          <Title>
            <Text >ao MPOA!</Text>
          </Title>
        </View>

        <images.logoparque width={400} height={142} />

        <View className="flex lg:px-96 items-center mx-4 mt-2 gap-5">
          <Logininput textHolder="CPF" value={CPF} onChangeText={setCPF}>
            <images.user width="24px" height="24px"/>
          </Logininput>

          <Logininput visible={visible} textHolder="Senha" value={password} onChangeText={setPassword}>
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
            >
              <images.lock width="24px" height="24px"/>
            </TouchableOpacity>
          </Logininput>
        </View>
        <Text className="text-red-500">{error}</Text>

        <View className={`flex items-center w-full mt-14 mb-12`}>
          <SubmitButton title="Login" 
            onPress={() => handleLogin()}
          />
        </View>
      </KeyboardAvoidingView>

      <View className={`justify-around flex-row ${keyboardOpen? 'hidden': ''}`}>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.ifspLogo}
            style={{ width: 100, height: 60, resizeMode: "contain" }}
          />
        </View>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.ffLogo}
            style={{ width: 100, height:100, resizeMode: "contain" }}
          />
        </View>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.semilLogo}
            style={{ width: 100, height: 95, resizeMode: "contain" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
