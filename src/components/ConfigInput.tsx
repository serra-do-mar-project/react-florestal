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
  
    <View className="flex items-center justify-between flex-row w-full h-10 mb-4  bg-gray-100 border border-green-600  rounded-md shadow-lg">
    <TextInput 
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={visible}
      className="flex-1 px-2 mt-0.5 text-black text-lg font-semibold"
      placeholder = {textHolder}
    />
    {children && (
        <View className="flex-2 items-center justify-center">
          {children}
        </View>
      )}
  </View>
  );
}