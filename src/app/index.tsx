'use client'

import { View, Text, Image} from "react-native";
import images from '../constants/images'
import Title from "../components/Title";
import { FullWindowOverlay } from "react-native-screens";
import { Logininput } from "../components/Logininput";
import { SubmitButton } from "../components/Button";
import { useState } from "react";
import { Checkbox } from "../components/Checkbox";

export default function Index() {

  const [isChecked, setIsChecked] = useState(false);
  return (
      <View className="w-screen h-screen flex bg-white">

          <View className="flex items-center w-full h-20 sm:mt-20 xs:mt-10">
                  <Title>
                    Seja Bem-Vindo(a)
                  </Title>

                  <Title>
                  ao EcoGuarda!
                  </Title>

          </View>

          <View className="flex w-full h-fit mt-10 justify-center items-center"> 
                <images.logoOnca width={FullWindowOverlay} height={220}
                 />
          </View>

          <View className="flex lg:px-96 items-center mx-4 mt-12">

              <Logininput textHolder="CPF">

              <images.user width="24px" height="24px"/>

              </Logininput>

              <Logininput textHolder="Senha">
                <images.lock width="24px" height="24px"/>
              </Logininput>
              
              <View className="flex flex-row items-center w-full pl-10">
                <Checkbox
                onPress={() => setIsChecked(!isChecked)} check={isChecked}/>

                <Text 
                 className="w-full ml-1.5 text-black text-base font-semibold"
                 onPress={() => setIsChecked(!isChecked)}>
                  Lembrar de mim
                  </Text>

              </View>

          </View>

          <View className="flex items-center w-full mt-12">
                <SubmitButton title="Entrar"/>
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
