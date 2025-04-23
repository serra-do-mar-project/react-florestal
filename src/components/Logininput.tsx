import { View, TextInput } from "react-native";

interface props {
  children?: React.ReactNode,
  textHolder?: string;
}

export function Logininput({children, textHolder}: props){
  return (
  
    <View className="flex items-center justify-between flex-row w-full h-16 mx-5 mb-5 px-5 bg-gray-100 border border-green-600 rounded-full shadow-2xl">
    <TextInput 
      className=" flex-1 w-full text-black placeholder: text-xl font-semibold"
      placeholder = {textHolder}
    />
    {children && (
        <View className="flex items-center justify-center">
          {children}
        </View>
      )}
  </View>
  );
}