'use client'

import { View, Text, Image, TouchableOpacity, } from "react-native";

import images from '../constants/images'
import Title from "../components/Title";
import { FullWindowOverlay } from "react-native-screens";
import { Logininput } from "../components/Logininput";
import { SubmitButton } from "../components/LoginButton";
import React, { useState } from "react";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { useRouter } from "expo-router";


export default function Index() {

  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  return (
      <View className="w-full h-full flex bg-white">

          <View className="flex items-center w-full h-20 sm:mt-20 xs:mt-10">
                  <Title>
                    Seja Bem-Vindo(a)
                  </Title>

                  <Title>
                  ao MPOA!
                  </Title>

          </View>

          <View className="flex w-full h-fit mt-10 justify-center items-center"> 
                <images.logoParque width={FullWindowOverlay} height={180}
                 />
          </View>

          <View className="flex lg:px-96 items-center mx-4 mt-12">

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
              
              <View className="w-full pl-11">
                <CheckboxWithLabel
                  checked={checked}
                  onCheckedChange={setChecked}
                  label="Lembrar de mim" 
                />
              </View>

          </View>

          <View className="flex items-center w-full mt-12">
                <SubmitButton title="Login" 
                  onPress={() => router.push("/auth/searchPage")}
                  />
          </View>

          <View className="flex flex-1 justify-around items-end flex-row mt-8">
            <Image
              source={images.ifspLogo}
              style={{ width: 95, height: 95 }}
              resizeMode="contain"
            />
            <Image
              source={images.ffLogo}
              style={{ width: 120, height: 120, marginLeft: 15 }} // Espaçamento entre as imagens
              resizeMode="contain"
            />
            <Image
              source={images.semilLogo}
              style={{ width: 110, height: 110}} // Espaçamento entre as imagens
              resizeMode="contain"
            />
          </View>
         
      </View>
  );
}
