import React from "react";
import { View, Text } from "react-native";

interface FormCardProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  contentClassName?: string;
  currentPage?: number;
  totalPages?: number;
}



export default function FormCard({ children, contentClassName, title, currentPage, totalPages, subTitle ="Preencha os campos abaixo" }: FormCardProps) {

  let padTop ="pt-5"

  if(subTitle == ""){
    padTop = ""
  }

  return (
    <View className="bg-white w-full pb-7 mb-4 mx-5 border border-gray-800/80 rounded-lg">
      <View className="px-6 py-4 mt-1">
       <View className="flex-row justify-between">
        <Text className="flex-1 font-semibold" style={{ fontSize: 22 }}>
          {title || "Seção"}
        </Text>
        <Text className="flex-2 font-sans text-gray-900/70 text-sm pt-3.5">
          {`Página ${currentPage?.toString().padStart(2, '0') ?? '01'} de ${totalPages?.toString().padStart(2, '0') ?? '05'}`}
        </Text>
       </View>
        <Text className="font-sans text-gray-900/60 text-sm">
          {subTitle}
        </Text>
      </View>

      <View className={`${padTop} pb-5 mx-7 justify-around gap-3 ${contentClassName ?? ""}`}>
        {children}
      </View>
    </View>
  );
}