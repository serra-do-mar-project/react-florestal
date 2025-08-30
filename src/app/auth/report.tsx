import { DataInput } from "@/src/components/dataInput";
import DropdownBox from "@/src/components/report/DropdownBox";
import FormCard from "@/src/components/report/FormCard";
import RadioButton from "@/src/components/report/RadioButton";
import TextArea from "@/src/components/report/TextArea";
import images from "@/src/constants/images";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ReportPage() {

  const options = ["Opção 1", "Opção 2", "Opção 3"];
  const[trowError, setTrowError] = useState<Boolean>(false)
  const [newData, setNewData] = useState("");
  const [newData2, setNewData2] = useState("");
  const [newData3, setNewData3] = useState("");

  const [form, setForm] = useState<any>({}) 
  console.log(form)
 
        
  return ( 
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Relátorio diário</Text>
      </View>
  
      <ScrollView className="flex-1 "> 
        <View className="pt-10"> 
            <FormCard title="Dropdown"> 
              <DropdownBox onSelect={(selectedOption) => form[1] = selectedOption} title="Equipe" options={options} />
              <DropdownBox onSelect={(selectedOption) => form[2] = selectedOption} options={options}/>
              <DropdownBox onSelect={(selectedOption) => form[3] = selectedOption} options={options}/>
            </FormCard>

            <FormCard>
            <RadioButton onSelect={(selectedOption) => form[4] = selectedOption} title="Pergunta 1" options={options} multiSelect={false}/>
            <RadioButton title="Pergunta 2" options={options} />

            </FormCard>

            <FormCard> 
              <DataInput
                data={newData}
                setData={setNewData}
                label="Nome Completo"
              />
              <DataInput
                data={newData2}
                setData={setNewData2}
                label="CPF"
              />

              <TextArea
                label="Descreva o ocorrido"
                value={newData3}
                onChangeText={setNewData3}
              />

              
            </FormCard>

        </View>

      </ScrollView>

       

      
    </View>
  );
}