'use client'

import { View, Image, TouchableOpacity, Keyboard, Text,} from "react-native";
import images from '../constants/images'
import Title from "../components/Title";
import { FullWindowOverlay } from "react-native-screens";
import { Logininput } from "../components/Logininput";
import { SubmitButton } from "../components/SubmitButton";
import React, { useEffect, useState } from "react";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";




export default function loginPage() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);


  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
        <ScrollView
          scrollEnabled={keyboardOpen}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <View className={`flex items-center w-full h-20 ${keyboardOpen ? "mt-20" : "mt-10 mb-5 xs:mt-20"}`} >
                  <Title>
                    <Text >Seja Bem-Vindo(a)</Text>        
                  </Title>

                  <Title>
                    <Text >ao MPOA!</Text>
                  </Title>

          </View>
          <View className={`flex w-full h-fit ml-0.5 ${keyboardOpen ? "mt-1 mb-1 " : "mt-1 mb-5"} items-center`}> 
            <images.logoparque width={keyboardOpen ? 200 : 500} height={keyboardOpen ? 160 : 190} />
          </View>
          <View className="flex lg:px-96 items-center mx-4 mt-4" >
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
            <View className="w-full pl-6">
              <CheckboxWithLabel
                checked={checked}
                onCheckedChange={setChecked}
                label="Lembrar de mim" 
              />
            </View>
          </View>
          <View className={`flex items-center w-full ${keyboardOpen? "mt-12" : "mt-14"} mb-12`}>
            <SubmitButton title="Login" 
              onPress={() => router.push("/auth/search")}
            />
          </View>
        </ScrollView>

          {!keyboardOpen &&
          
          <View className="flex-2 justify-around items-end flex-row mt-8">
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
          
    
          }
          
      </View>
      
  );
}
