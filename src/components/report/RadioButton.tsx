import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";



export default function RadioButton() {
  const [selected, setSelected] = useState(false);

  return(
     <View>
              <Text className="font-semibold text-xl ml-1">Pergunta</Text>
              
              <TouchableOpacity
        className={`flex-row pt-3 px-15 items-center`}
        onPress={() => setSelected(!selected)}
      >
                <View className={`size-5 border-2 border-gray-900/80 rounded-full ${selected&& "bg-gray-900/70"}`}/>
                <Text className="pl-2 pt-1 font-sans text-xl">Opção</Text>
              </TouchableOpacity>
              
    </View>
  );
}