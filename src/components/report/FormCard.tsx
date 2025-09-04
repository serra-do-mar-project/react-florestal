import React from "react";
import { View, Text } from "react-native";

interface FormCardProps {
  title?: string;
  children?: React.ReactNode;
  contentClassName?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function FormCard({ children, contentClassName, title, currentPage, totalPages }: FormCardProps) {
  return (
    <View className="bg-white w-full pb-7 mb-4 mx-5 border border-gray-800/80 rounded-lg">
      <View className="px-6 py-2">
       <View className=" flex-row justify-between items-center">
        <Text className="font-semibold" style={{ fontSize: 23 }}>
          {title || "Seção"}
        </Text>
        <Text className="text-gray-800 text-sm ">
          {`Página ${currentPage?.toString().padStart(2, '0') ?? '01'} de ${totalPages?.toString().padStart(2, '0') ?? '05'}`}
        </Text>
       </View>
        <Text className="text-gray-800 text-sm">
          Preencha esses campos abaixo
        </Text>
      </View>

      <View className={`pt-5 pb-5 mx-7 justify-around gap-3 ${contentClassName ?? ""}`}>
        {children}
      </View>
    </View>
  );
}