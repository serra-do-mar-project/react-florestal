import React from "react";



import { View, Text, Image } from "react-native";
import images from "@/src/constants/images";
import Title from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";

export default function SearchPage() {
  return (
    <View className="w-full h-full">
      <View className="w-full h-fit mt-11 pt-8 pl-10">
        <Title>Buscar Infração</Title>
      </View>

      <SearchBar />

      {/* Contêiner dos cards */}
      <View className="flex-row flex-wrap justify-center gap-4 w-full px-5 mt-5">
        {/* Card 1 */}
        <View className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-green-100 shadow-md">
          <View className="h-32">
            <Image
              source={images.fauna}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View className="flex items-center pb-2.5">
            <Text className="text-xl font-medium">Fauna</Text>
          </View>
        </View>

        {/* Card 2 */}
        <View className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-green-100 shadow-md">
          <View className="h-32">
            <Image
              source={images.fauna}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View className="flex items-center pb-2.5">
            <Text className="text-xl font-medium">Fauna</Text>
          </View>
        </View>

        {/* Card 3 */}
        <View className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-green-100 shadow-md">
          <View className="h-32">
            <Image
              source={images.fauna}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View className="flex items-center pb-2.5">
            <Text className="text-xl font-medium">Fauna</Text>
          </View>
        </View>

        {/* Card 4 */}
        <View className="h-44 w-[45%] rounded-lg overflow-hidden bg-white border border-green-100 shadow-md">
          <View className="h-32">
            <Image
              source={images.fauna}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View className="flex items-center pb-2.5">
            <Text className="text-xl font-medium">Fauna</Text>
          </View>
        </View>
      </View>
    </View>
  );
}