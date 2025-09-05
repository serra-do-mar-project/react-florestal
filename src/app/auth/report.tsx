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

            <FormCard title="Localização" currentPage={3} totalPages={totalPages}>
              
              <Forminput 
                title="Rua/Estrada/Trilha"
                label="Ex: Estrada do Pouso Alto"
                onChangeText={(text) => form[12] = text}
                showError={trowError}
              />
              <Forminput 
                title="Número/Quilômetro"
                label="Ex: Km 04"
                onChangeText={(text) => form[13] = text}
                showError={trowError}
              />

              <Forminput 
                title="Bairro"
                label="Ex: Bairro Rio Negro"
                onChangeText={(text) => form[14] = text}
                showError={trowError}
              />

              <RadioButton
                title="Setores Fiscalizados"
                options={["Caraguatatuba Norte", "Caraguatatuba Sul", "Alto da Serra Norte", "Alto da Serra Sul"]}
                onSelect={(selectedDate) => form[15] = selectedDate}
                showError={trowError}
              />

              <Forminput 
                title="Especificação do Local"
                label="Ex.: Posse abandonada, Trilha em meio à mata, Rodovia Estadual, Estrada que liga Caraguatatuba à Salesópolis, etc."
                onChangeText={(text) => form[16] = text}
                showError={trowError}
              />

            </FormCard>

            <FormCard title="Fizcalização" currentPage={4} totalPages={totalPages}>
            <TextArea 
                title="Relatório de Fiscalização"
                onChangeText={(text) => form[17] = text}
                showError={trowError}
                textHolder="Descrever de forma bem objetiva todas as atividade de fiscalização realizadas no período. Somente Fiscalização. Inserir relatório por área fiscalizada."
              />

              <TextArea 
                title="Outras atividades"
                label="NÃO RELACIONADAS à fiscalização"
                onChangeText={(text) => form[18] = text}
                showError={trowError}
                required={false}
              />
 
              <Forminput
                title="Coordenadas geográficas"
                label="Ex: -23,70916 / -45,544281"
                onChangeText={(text) => form[19] = text}
                showError={trowError}
              />

              <Forminput
                title="Referência da coordenada"
                label="Ex: Guarita Base RP"
                onChangeText={(text) => form[20] = text}
                showError={trowError}
              />

            </FormCard>

            <FormCard title="Dados da VTR" currentPage={5} totalPages={totalPages}>
              <Forminput
                  title="Placa do veículo"
                  onChangeText={(text) => form[21] = text}
                  showError={trowError}
                  required={false}
                />
              <Forminput
                  title="KM Inicial"
                  label="Colocar somente números"
                  onChangeText={(text) => form[22] = text}
                  showError={trowError}
                  required={false}
                />
              <Forminput
                  title="KM Final"
                  label="Colocar somente números"
                  onChangeText={(text) => form[23] = text}
                  showError={trowError}
                  required={false}
                />
              <Forminput
                  title="Condições da VTR"
                  label="Em caso de problemas mecânicos, troca de VTR ou impossibilidade trafegar"
                  onChangeText={(text) => form[24] = text}
                  showError={trowError}
                  required={false}
                />
              
            </FormCard>

              <FormCard title="Detalhamento da Fiscalização" currentPage={6} totalPages={totalPages}>
                   <RadioButton
                      title="Tipos de Ação"
                      options={["Incurssão em Viatura", "Incursão a Pé", "Fiscalização Embarcada",
                                "Sobrevoo", "Fiscalização com Drone", "Bloqueio" ]}
                      onSelect={(selectedOption) => form[25] = selectedOption}
                      showError={trowError}
                   />

                   <TextArea 
                    title="Abordagens de veículos"
                    label="colocar todas as informações dos veículos abordados (tipo, modelo, placa, origem e destino)"
                    onChangeText={(text) => form[26] = text}
                    showError={trowError}
                    />

                    <Forminput
                      title="KM Percorridos (Viatura e a pé)"
                      label="Ex: 62km (viatura) e 4km (a pé)"
                      onChangeText={(text) => form[27] = text}
                      showError={trowError}
                    />

                    <DatePicker
                     title="Horas em Viatura"
                     mode="time"
                     onDateChange={(selectedDate) => form[28] = selectedDate}
                      showError={trowError}
                    />

                    <DatePicker
                     title="Horas a Pé"
                     mode="time"
                     onDateChange={(selectedDate) => form[29] = selectedDate}
                      showError={trowError}
                    />

                    <RadioButton
                      title="Veículos Abordados (tipo)"
                      options={["Motocicleta", "Automóvel", "Caminhão",
                                " Onibus/Vã",]}
                      onSelect={(selectedOption) => form[25] = selectedOption}
                      showError={trowError}
                   />

              </FormCard>


            

            <SubmitButton classname="my-10" title="enviar" onPress={() => handleSubmit(form)}/>

        </View>

      </ScrollView>

       

      
    </View>
  );
}