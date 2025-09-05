import DatePicker from "@/src/components/report/DatePicker";
import DropdownBox from "@/src/components/report/DropdownBox";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import RadioButton from "@/src/components/report/RadioButton";
import TextArea from "@/src/components/report/TextArea";
import { SubmitButton } from "@/src/components/SubmitButton";
import images from "@/src/constants/images";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";



export default function ReportPage() {

  const options = ["Opção 1", "Opção 2", "Opção 3"];
  const[trowError, setTrowError] = useState<boolean>(false)
  const [form, setForm] = useState<any>({}) 
  const [selectedDate, setSelectedDate] = useState(new Date());

 
  

  const handleSubmit = (formData: any) => {
    const hasUndefined = Object.keys(formData).map(key => formData[key]).some(value => value === undefined);
    
    if (hasUndefined) {
      console.log("Erro: Existem campos undefined");
      console.log(form)
      setTrowError(true)
      return;
    }
    
    console.log("Formulário válido");
    console.log(form)
  }
 
   
    
        
  return ( 
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Relátorio diário</Text>
      </View>
   
      <ScrollView className="flex-1 "> 
        <View className="pt-10 items-center px-4 "> 
            <FormCard title="Dropdown"> 
              <DropdownBox onSelect={(selectedOption) => form[1] = selectedOption} showError={trowError} title="Equipe" options={options} />
              <DropdownBox onSelect={(selectedOption) => form[2] = selectedOption} showError={trowError} options={options}/>
              <DropdownBox onSelect={(selectedOption) => form[3] = selectedOption} showError={trowError} options={options}/>
              <TextArea
                label="Descreva o ocorrido"
                onChangeText={(selectedOption) => form[8] = selectedOption} 
                showError={trowError}
              />
              <Forminput
                onChangeText={(selectedOption) => form[7] = selectedOption} 
                showError={trowError}
                label="CPF"
              />
            </FormCard>

            <FormCard>
            <RadioButton onSelect={(selectedOption) => form[4] = selectedOption} showError={trowError} title="Pergunta 1" options={options} multiSelect={false}/>
            <RadioButton onSelect={(selectedOption) => form[5] = selectedOption} showError={trowError} title="Pergunta 2" options={options} />
            <TextArea
                label="Descreva o ocorrido"
                onChangeText={(selectedOption) => form[8] = selectedOption} 
                showError={trowError}
              />
            </FormCard>

            <FormCard> 
              <Forminput
                onChangeText={(selectedOption) => form[6] = selectedOption} 
                showError={trowError}
                label="Nome Completo"
              />
              <Forminput
                onChangeText={(selectedOption) => form[7] = selectedOption} 
                showError={trowError}
                label="CPF"
              />

              <TextArea
                label="Descreva o ocorrido"
                onChangeText={(selectedOption) => form[8] = selectedOption} 
                showError={trowError}
              />


              
            </FormCard>

            <FormCard>
              <DatePicker title="Data da infração" onDateChange={(selectedOption) => form[9] = selectedOption} showError={trowError}/>
              <DatePicker mode="time" title="Hora da infração" onDateChange={(selectedOption) => form[10] = selectedOption} showError={trowError}/>
            </FormCard>
            

            <SubmitButton classname="my-10" title="enviar" onPress={() => handleSubmit(form)}/>

        </View>

      </ScrollView>

       

      
    </View>
  );
}