import { Input } from "@/src/components/Input";
import { View } from 'react-native';
import images from "@/src/constants/images";

export default function SearchBar() {
  return (
    <View className="w-full h-fit mt-8">
        <View className=" flex-row items-center justify-between w-fit h-fit mx-5 border border-green-100 bg-white px-4 py-2 rounded-2xl">
          <Input className="flex-1 border-transparent bg-transparent" placeholder="Pesquisar"/>
          <images.search width={24} height={24} stroke="black" strokeWidth={0.5} />
      </View>
    </View>
  )
}
