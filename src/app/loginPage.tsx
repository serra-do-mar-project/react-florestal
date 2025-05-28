'use client'

import { View, Text, Image, } from "react-native";
import images from '../constants/images'
import Title from "../components/Title";
import { FullWindowOverlay } from "react-native-screens";
import { Logininput } from "../components/Logininput";
import { SubmitButton } from "../components/SubmitButton";
import React, { useState } from "react";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { useRouter } from "expo-router";


export default function loginPage() {

  const [checked, setChecked] = useState(false);
  const router = useRouter();

  return (
      <View className="w-full h-full flex bg-white">

          <View className="flex items-center w-full h-20 sm:mt-20 xs:mt-10">
                  <Title>
                    Seja Bem-Vindo(a)
                  </Title>

                  <Title>
                  ao EcoGuarda!
                  </Title>

          </View>

          <View className="flex w-full h-fit sm:mt-12 xs:mt-8 justify-center items-center"> 
                <images.logoOnca width={FullWindowOverlay} height={220}
                 />
          </View>

          <View className="flex lg:px-96 items-center mx-4 sm:mt-16 mt-12">

              <Logininput textHolder="CPF">

              <images.user width="24px" height="24px"/>

              </Logininput>

              <Logininput textHolder="Senha">
                <images.lock width="24px" height="24px"/>
              </Logininput>
              
              <View className="items-center w-full pl-11">
                <CheckboxWithLabel
                  checked={checked}
                  onCheckedChange={setChecked}
                  label="Lembrar de mim" 
                />
              </View>

          </View>

          <View className="flex items-center w-full mt-12">
                <SubmitButton title="Entrar" 
                  onPress={() => router.push("/auth/searchPage")}
                  />
          </View>

          <View className="flex flex-1 justify-end items-end flex-row mt-8">
            <Image
              source={images.brasao}
              style={{ width: 55, height: 55 }}
              resizeMode="contain"
            />
            <Image
              source={images.logoArvore}
              style={{ width: 55, height: 55, marginRight: 4 }} // Espaçamento entre as imagens
              resizeMode="contain"
            />
          </View>
         
      </View>
       
      

  );
}
