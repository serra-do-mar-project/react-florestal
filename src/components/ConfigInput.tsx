import { View, TextInput } from "react-native";

interface props {
  children?: React.ReactNode,
  textHolder?: string;
  visible?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function Configinput({children, textHolder, visible, value, onChangeText}: props){
  return (
  
    <View className="flex items-center justify-between flex-row w-full h-10 mb-5 px-2 bg-gray-100 border border-green-600  rounded-md shadow-lg">
    <TextInput 
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={visible}
      className=" flex-1 w-full text-black text-xl font-semibold"
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