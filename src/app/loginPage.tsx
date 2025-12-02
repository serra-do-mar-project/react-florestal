import { View, Keyboard, Text, KeyboardAvoidingView, Platform } from "react-native";
import Title from "../components/Title";
import { SubmitButton } from "../components/SubmitButton";
import React, { useEffect, useState, useMemo } from "react";
import { Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../lib/utils";
import { useUserStore } from "../store/userStore";
import { Configinput } from "../components/ConfigInput";
import { PasswordInput } from "../components/PasswordInput";
import { Image } from "expo-image";
import images from "../constants/images";

export default function loginPage() {
  const router = useRouter();
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [error, setError] = useState("")

  const { login: userLogin, token } = useUserStore()

  function formatCPF(text: string) {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);

    // Aplica a formatação XXX.XXX.XXX-XX
    let formatted = limited;
    if (limited.length > 3) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3);
    }
    if (limited.length > 6) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3, 6) + '.' + limited.slice(6);
    }
    if (limited.length > 9) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3, 6) + '.' + limited.slice(6, 9) + '-' + limited.slice(9);
    }

    return formatted;
  }

  function handleCpfChange(text: string) {
    const formatted = formatCPF(text);
    setCPF(formatted);
  }

  useEffect(() => {
    if (error) setError("")
  }, [password, CPF])

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  if (token)
    return <Redirect href="/auth/search" />

  const handleLogin = async () => {
    if (!CPF.trim() || !password.trim()) {
      setError("CPF e senha precisam estar preenchidos")
      return
    }

    try {
      const data = await login(CPF, password)
      userLogin(data.user.id, data.user.nome, data.user.tipo, data.token);
      router.replace("/auth/search")
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 items-center justify-around"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {!keyboardOpen ? (
          <View className={`flex items-center w-full h-20 mt-2`} >
            <Title>
              <Text >Seja Bem-Vindo(a)</Text>
            </Title>
            <Title>
              <Text >ao MPOA!</Text>
            </Title>
          </View>
        ) : (<></>)}

        <Image
          source={images.logoparque}
          style={{ width: 200, height: keyboardOpen ? 100 : 160 }}
          contentFit="contain"
        />

        <View className="flex w-full px-6 items-center mx-4 ">
          <Configinput textHolder="CPF" value={CPF} onChangeText={handleCpfChange} keyboardType="numeric" maxLength={14} className="h-16 rounded-2xl -mb-4">
            <Image
              source={images.user}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </Configinput>
          <PasswordInput textHolder="Senha" password={password} setPassword={setPassword} className="h-16 rounded-2xl" />
          <Text className="w-full text-red-500 mt-2 pl-4 pb-2">{error}</Text>
        </View>

        <View className={`px-6 flex items-center w-full ${keyboardOpen ? 'mt-8 mb-4' : 'mt-4 mb-20'}`}>
          <SubmitButton
            classname="w-full"
            title="Login"
            onPress={() => handleLogin()}
          />
        </View>
      </KeyboardAvoidingView>

      <View className={`justify-around flex-row ${keyboardOpen ? 'hidden' : ''}`}>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.ifspLogo}
            style={{ width: 100, height: 60 }}
            contentFit="contain"
          />
        </View>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.ffLogo}
            style={{ width: 100, height: 100 }}
            contentFit="contain"
          />
        </View>
        <View className="items-center justify-center w-24 h-24 bg-transparent">
          <Image
            source={images.semilLogo}
            style={{ width: 100, height: 95 }}
            contentFit="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
