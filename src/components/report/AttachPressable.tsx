import images from '@/src/constants/images';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

interface AttachPressableProps {
  autosSelected: any[];
  onPress: () => void;
}

export default function AttachPressable({ autosSelected, onPress }: AttachPressableProps) {

  if (autosSelected.length === 0) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="min-w-[60%] -mt-3 -mb-2 self-start bg-green-500 py-1 px-3 rounded-lg border border-green-500"
      >
        <View className='flex-row justify-between gap-3 items-center'>


          <Text className="text-white text-lg pt-1 pb-0.5 font-BaiJamJuree_Medium">Selecionar Autos</Text>
          <View className='pb-0.5'>
            <Image source={images.clip} style={{ width: 20, height: 20 }} contentFit="contain" tintColor="white" />
          </View>
        </View>

      </TouchableOpacity>
    );
  }
  else {

    return (

      <View className="w-full -mt-3 -mb-2">
        <TouchableOpacity
          onPress={onPress}
          className="min-w-[60%] self-start flex-row items-center justify-between bg-white py-1 px-3 rounded-lg mb-1 border border-green-500"
        >
          <Text className="text-black text-lg pt-1 font-semibold">Editar Autos ({autosSelected.length}) </Text>
          <View className='pb-0.5'>
            <Image source={images.clip} style={{ width: 20, height: 20 }} contentFit="contain" />
          </View>

        </TouchableOpacity>

        <View className="flex-row items-center justify-between px-2">

          <Text className="text-sm text-gray-700">{autosSelected.length} selecionado(s)</Text>
        </View>
      </View>
    );

  }
}