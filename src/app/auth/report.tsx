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

  const totalPages = 8;

 
  

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
        <View className="pt-10 items-center px-4"> 

            <FormCard title="Equipe" currentPage={1} totalPages={totalPages}>
              <DropdownBox
                title="Nome da quipe" 
                options={["Charlie Sede Diurno", "Charlie RP Diurno", "Charlie RP Noturno", "Delta Sede Diurno", "Delta RP Diurno", "Delta RP Noturno" ]}
                onSelect={(selectedOption) => form[1] = selectedOption}
                showError={trowError}
              />

              <RadioButton
                title="Equipe em Atuação"
                options={["Miguel Nema Neto", "Alvimar de Melo Amorim", "William Fonseca Celestino da Silva", 
                          "Alex Roberto dos Santos", "Paulo Sérgio Farias", "Alexandro dos Santos", "Luciano José da Silva",
                          "Valdenei Esbruzzi", "Alef Irmão de Moura", "Leonardo Sant'Anna Martins", "Genivaldo Duque da Silva",
                          "Brian Luiz Gomes Mortensen Ferreira", "Lucas Tomi Assai", "Maurilio Costa Ramos", " João Leonardo",
                          "Elson da Silva", " Renilson Luiz", "Jenifer de Magalhães luz", "Davidson Fernandes Raimundo", "Vanessa Trally Bard",
                          "Fabio Henrique Paiva de Souza", "Ailton Silva Souza", "Anthony Elias Galdino Ramos", "Marcos Antônio Ramos Lima"
                        ]}
                onSelect={(selectedOption) => form[2] = selectedOption}
                showError={trowError}
              />
              <TextArea title="Outros" 
                        onChangeText={(selectedOption) => form[3] = selectedOption}
                        showError={trowError}
                        required={false}
              />
            </FormCard>

            <FormCard title="Dados da Ação" currentPage={2} totalPages={totalPages}>
              <TextArea 
                title="Órgãos e Instituições envolvidas" 
                label="Preencher com os nomes e pelo menos um documento (RG, CPF, RE, Matrícula, etc...) - PAMB, Bombeiros, Polícia Rodoviária, CETESB, Prefeitura, etc."
                onChangeText={(text) => form[4] = text} 
                required={true}
                showError={trowError}
              />

              <Forminput 
                title="Responsável pelo preenchimento" 
                label="(Nome e CNV)" 
                onChangeText={(text) => form[5] = text} 
                showError={trowError}/>

              <DatePicker 
                title="Data e Hora do início da ação" 
                showError={trowError}
                onDateChange={(selectedDate) => form[6] = selectedDate}
              />

              <DatePicker 
                mode="time"
                showError={trowError}
                onDateChange={(selectedDate) => form[7] = selectedDate}
              />

              <DatePicker 
                title="Data e hora do término da ação" 
                showError={trowError}
                onDateChange={(selectedDate) => form[8] = selectedDate}
              />

              <DatePicker 
                mode="time"
                showError={trowError}
                onDateChange={(selectedDate) => form[9] = selectedDate}
              />

              <DropdownBox
                title="Origem da Ação" 
                options={["Rotina", "Planejamento SIM-UC", "DEJEM SIM-UC", "Denúnica", "Atendimento a Órgãos Externos", "Demanda Solicitação Interna" ]}
                onSelect={(selectedOption) => form[10] = selectedOption}
                showError={trowError}
              />

              <RadioButton
                title="Registro de ocorrência"
                multiSelect={false}
                options={["Sim", "Não"]}
                onSelect={(selectedOption) => form[11] = selectedOption}
                showError={trowError}
              />
              

            </FormCard>

          




            

            <SubmitButton classname="my-10" title="enviar" onPress={() => handleSubmit(form)}/>

        </View>

      </ScrollView>

       

      
    </View>
  );
}