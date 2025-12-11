import images from "@/src/constants/images";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { SubmitButton } from "../SubmitButton";
import { DefaultModal, useModal } from "../DefaultModal";

type Props = {
  success?: boolean;
};


export default function SendStatusModal({ success}: Props) {

  const { closeWithAnimation } = useModal();

  useEffect(() => {

  }, [success]);

  return (
    
    <View className="w-full justify-center items-center">
      {success === true ?

        <View className="w-full items-center mt-2 ">
          
          <Image
            source={images.success}
            style={{ width: 120, height: 70, }}
            contentFit="contain"
          />
          <Text className="text-3xl font-BaiJamJuree_Bold text-gray-900 mt-6" >SUCESSO</Text>
          <Text className="text-xl  text-gray-900 mt-2">O relatório foi enviado!</Text>
          
          <SubmitButton classname="w-5/6 mt-12 mb-5" title="Confirmar" onPress={closeWithAnimation} />
        </View>
        

        : success === undefined ?
        <View className="w-full">
          <Text className="w-full text-2xl font-BaiJamJuree_Medium text-center text-gray-900 pb-5 mt-10" >Enviando relatório</Text>
          <ActivityIndicator size="large" />
        </View>

        :

        <View className="w-full items-center mt-2 ">
          
          <Image
            source={images.error}
            style={{ width: 120, height: 70, }}
            contentFit="contain"
          />
          <Text className="text-3xl font-BaiJamJuree_Bold text-gray-900 mt-6" >ERRO</Text>
          <Text className="text-xl  text-gray-900 mt-2">Houve um erro no envio do formulário</Text>
          
          <SubmitButton classname={`w-5/6 mt-12 mb-5 bg-red-800 border-red-950`} title="Confirmar" onPress={closeWithAnimation} />
        </View>

      }

    </View>
   

  );


}