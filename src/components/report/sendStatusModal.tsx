import images from "@/src/constants/images";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { SubmitButton } from "../SubmitButton";
import { useModal } from "../DefaultModal";

type Props = {
  success?: boolean;
};


export default function SendStatusModal({success}: Props) {

  const { closeWithAnimation } = useModal();

  useEffect(() => {
    
  }, [success]);

  return (
      <View className="w-full justify-center items-center">
          {success?
            <View className="w-full items-center ">
              <Text className="text-2xl font-BaiJamJuree_Medium text-gray-900 mb-5" >Relatório enviado com sucesso!</Text>
              <Image 
              source={images.succes}
              style={{width: 300, height: 120, }}
              resizeMode="contain"
              />
              <SubmitButton classname="w-5/6 mt-12 mb-5" title="Confirmar" onPress={closeWithAnimation}/>
            </View>
            
            :
            
            <View className="w-full">
              <Text className="w-full text-2xl font-BaiJamJuree_Medium text-center text-gray-900 pb-5 mt-10" >Enviando relatório</Text>
              <ActivityIndicator size="large" />
            </View>
          }
        
      </View>

  );


}