import { Pressable, Text } from "react-native";
import images from "@/src/constants/images"
import { useEffect } from "react";


interface ButtonProps {
  text: string;
  children?: React.ReactNode,
  onPress?: () => void;
    isActive: boolean;
}

export function TabButton({children, text, onPress, isActive
}: ButtonProps){

    return(

          <Pressable onPress={onPress} 
          className= {`h-full flex-1 items-center justify-center flex-col ${
            isActive ? "bg-gray-300" : "bg-gray-200"}`}>
              {children}
              <Text className= "font-medium text-lg">{text}</Text>
          </Pressable>




  );
}


// <images.settings width={24} height={24} stroke="black" strokeWidth={0.5} />