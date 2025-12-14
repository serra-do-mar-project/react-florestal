import images from "@/src/constants/images";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView} from "react-native";
import { Image } from "expo-image";
import { LeavePressable } from "@/src/components/configuration/LeavePressable";
import { useUserStore } from "@/src/store/userStore";
import ConfigPressable from "@/src/components/configuration/ConfigPressable";
import { DefaultModal } from "@/src/components/DefaultModal";
import ChangeOwnPasswordModal from "@/src/components/configuration/ChangePasswordModal";
import AboutUsModal from "@/src/components/configuration/AboutUsModal";

export default function ConfigPage() {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [aboutUsModal, setAboutUsModal] = useState(false);

  const { nome, tipo, id, token } = useUserStore()

  return (
    <View className="w-full h-full">
      <View className="bg-[#fffdfd] pt-7 pb-5 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Configurações</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

        <View className="flex-1 justify-between">

        <View>

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

      
        <ConfigPressable title="Alterar senha" onPress={() => setChangePasswordModal(true)} />
       
        <ConfigPressable title="Sobre"  onPress={() => setAboutUsModal(true)} />

        </View>

        <View className={` mb-5`} >
          <LeavePressable />
        </View>

        </View>
      </ScrollView>

      <DefaultModal visible={changePasswordModal || aboutUsModal} onClose={() => (setChangePasswordModal(false), setAboutUsModal(false))} >
        {changePasswordModal?
          <ChangeOwnPasswordModal token={token} id={id}/>
          :
          <AboutUsModal/>
        } 
      </DefaultModal>
      
    </View>


  );
}
