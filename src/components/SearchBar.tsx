import { TextInput, View, TouchableOpacity } from 'react-native';
import images from "@/src/constants/images";

export default function SearchBar() {
  return (
    <View className="w-full h-fit mt-8">
        <View className=" flex-row items-center justify-between w-fit h-16 mx-5 border border-gray-900/30 bg-white pl-4 rounded-2xl">
          <TextInput
            placeholder="Pesquisar"
            className="flex-1 font-sans text-lg text-black justify-center "
          />
          <TouchableOpacity className="h-full justify-center px-4">
            <images.search width={24} height={24} stroke="black" strokeWidth={0.5} />
          </TouchableOpacity>
          
      </View>
    </View>
  )
}
