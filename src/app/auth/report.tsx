import DatePicker from "@/src/components/report/DatePicker";
import DropdownBox from "@/src/components/report/DropdownBox";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import  {DurationInput} from "@/src/components/report/DurationInput";
import RadioButton from "@/src/components/report/RadioButton";
import TextArea from "@/src/components/report/TextArea";
import { SubmitButton } from "@/src/components/SubmitButton";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@/src/components/report/DateTimePicker";

export default function ReportPage() {
  const options = ["Opção 1", "Opção 2", "Opção 3"];
  const [trowError, setTrowError] = useState<boolean>(false);
  const [form, setForm] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [vtr, setVtr] = useState<boolean>(true);

  const totalPages = 8;

  const handleSubmit = (formData: any) => {
    const hasUndefined = form.some(field => 
      !field || !field.valor || field.valor.some((value: string | null | undefined) => value === undefined || value === "" || value === null)
    );

    if (hasUndefined) {
      console.log("Erro: Existem campos undefined");
      setTrowError(true);
      console.log(form)
      return;
    }

    console.log("Formulário válido");
    console.log(form)
  };

  const setField = (fieldIndex: number, valueIndex: number, value: string | string[] | null | undefined) => {
    const stringValue = Array.isArray(value) ? value.join(', ') : (value as string | null | undefined);
    setForm(prev => {
      const next = Array.isArray(prev) ? [...prev] : [];
      // Ensure the slot exists and follows the existing pattern: an object keyed by index holding an array
      if (!next[fieldIndex]) next[fieldIndex] = { [fieldIndex]: [] } as any;
      if (!next[fieldIndex][fieldIndex]) next[fieldIndex][fieldIndex] = [];
      next[fieldIndex][fieldIndex][valueIndex] = stringValue;
      return next;
    });
  };

  return (
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <Text className="text-gray-900 font-semibold text-3xl ml-7">Relátorio diário</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="pt-10 items-center px-4">
          {/* Equipe */}
          <FormCard title="Equipe" currentPage={1} totalPages={totalPages}>
            <DropdownBox
              title="Nome da equipe"
              options={["Charlie Sede Diurno", "Charlie RP Diurno", "Charlie RP Noturno", "Delta Sede Diurno", "Delta RP Diurno", "Delta RP Noturno"]}
              onSelect={(option) => setField(0, 0, option)}
              showError={trowError}
            />
            <RadioButton
              title="Equipe em Atuação"
              options={["Miguel Nema Neto", "Alvimar de Melo Amorim", "William Fonseca Celestino da Silva", 
                          "Alex Roberto dos Santos", "Paulo Sérgio Farias", "Alexandro dos Santos", "Luciano José da Silva",
                          "Valdenei Esbruzzi", "Alef Irmão de Moura", "Leonardo Sant'Anna Martins", "Genivaldo Duque da Silva",
                          "Brian Luiz Gomes Mortensen Ferreira", "Lucas Tomi Assai", "Maurilio Costa Ramos", " João Leonardo",
                          "Elson da Silva", " Renilson Luiz", "Jenifer de Magalhães luz", "Davidson Fernandes Raimundo", "Vanessa Trally Bard",
                          "Fabio Henrique Paiva de Souza", "Ailton Silva Souza", "Anthony Elias Galdino Ramos", "Marcos Antônio Ramos Lima"]}
              onSelect={(option) => setField(1, 0, option)}
              showError={trowError}
            />
            <TextArea
              title="Outros"
              onChangeText={(option) => setField(1, 1, option)}
              showError={trowError}
              required={false}
            />
          </FormCard>

          <FormCard title="Dados da Ação" currentPage={2} totalPages={totalPages}>
              <TextArea 
                title="Órgãos e Instituições envolvidas" 
                label="Preencher com os nomes e pelo menos um documento (RG, CPF, RE, Matrícula, etc...) - PAMB, Bombeiros, Polícia Rodoviária, CETESB, Prefeitura, etc."
                onChangeText={(res) => setField(2, 0, res)} 
                required={true}
                showError={trowError}
              />

              <Forminput 
                title="Responsável pelo preenchimento" 
                label="(Nome e CNV)" 
                onChangeText={(res) => setField(3, 0, res)} 
                showError={trowError}/>

             <DateTimePicker 
                title="Data e hora do início da ação"
                showError={trowError}
                onDateChange={(res) => {
                  res.map((item, index) => (setField(4, index, item)));
               }}
              />

              <DateTimePicker 
                title="Data e hora do término da ação"
                showError={trowError}
                onDateChange={(res) => {
                  res.map((item, index) => (setField(5, index, item)));
               }}
              />


              <DropdownBox
                title="Origem da Ação" 
                options={["Rotina", "Planejamento SIM-UC", "DEJEM SIM-UC", "Denúnica", "Atendimento a Órgãos Externos", "Demanda Solicitação Interna" ]}
                onSelect={(res) => setField(6, 0, res)}
                showError={trowError}
                
              />

              <RadioButton
                title="Registro de ocorrência"
                multiSelect={false}
                options={["Sim", "Não"]}
                onSelect={(res) => setField(7, 0, res)}
                showError={trowError}
                disabled={true}
              />
              

            </FormCard>

            <FormCard title="Localização" currentPage={3} totalPages={totalPages}>
              
            <RadioButton
                title="Área Fiscalizada Na Área Protegida"
                multiSelect={false}
                options={["Dentro", "Entorno (Zona de Amortecimento)"]}
                onSelect={(res) => setField(8, 0, res)} 
                showError={trowError}
              />
              
              <RadioButton
                title="Município(s)"
                multiSelect={false}
                options={["Caraguatatuba", "Paraibuna", "Natividade da Serra"]}
                onSelect={(res) => setField(9, 0, res)}
                showError={trowError}
              />

              <Forminput 
                title="Rua/Estrada/Trilha"
                label="Ex: Estrada do Pouso Alto"
                onChangeText={(res) => setField(10, 0, res)}
                showError={trowError}
              />
              <Forminput 
                title="Número/Quilômetro"
                label="Ex: Km 04"
                onChangeText={(res) => setField(10, 1, res)}
                showError={trowError}
              />

              <Forminput 
                title="Bairro"
                label="Ex: Bairro Rio Negro"
                onChangeText={(res) => setField(10, 2, res)}
                showError={trowError}
              />

              <RadioButton
                title="Setores Fiscalizados"
                options={["Caraguatatuba Norte", "Caraguatatuba Sul", "Alto da Serra Norte", "Alto da Serra Sul"]}
                onSelect={(res) => setField(11, 0, res)}
                showError={trowError}
              />

              <Forminput 
                title="Especificação do Local"
                label="Ex.: Posse abandonada, Trilha em meio à mata, Rodovia Estadual, Estrada que liga Caraguatatuba à Salesópolis, etc."
                onChangeText={(res) => setField(12, 0, res)}
                showError={trowError}
              />

            </FormCard>

            <FormCard title="Fizcalização" currentPage={4} totalPages={totalPages}>
            <TextArea 
                title="Relatório de Fiscalização"
                onChangeText={(res) => setField(13, 0, res)}
                showError={trowError}
                textHolder="Descrever de forma bem objetiva todas as atividade de fiscalização realizadas no período. Somente Fiscalização. Inserir relatório por área fiscalizada."
              />

              <TextArea 
                title="Outras atividades"
                label="NÃO RELACIONADAS à fiscalização"
                onChangeText={(res) => setField(14, 0, res)}
                showError={trowError}
                required={false}
              />
 
              <Forminput
                title="Coordenadas geográficas"
                label="Ex: -23,70916 / -45,544281"
                onChangeText={(res) => setField(15, 0, res)}
                showError={trowError}
              />

              <Forminput
                title="Referência da coordenada"
                label="Ex: Guarita Base RP"
                onChangeText={(res) => setField(15, 1, res)}
                showError={trowError}
              />

            </FormCard>

            <FormCard title="Dados da VTR" currentPage={5} totalPages={totalPages}>

              <RadioButton
                title="Foi feito uso de VTR?"
                options={["Sim", "Não"]}
                multiSelect={false}
                onSelect={(selectedOption) => setVtr(selectedOption === "Sim")}
              />

              <Forminput
                  title="Placa do veículo"
                  onChangeText={(res) => setField(16, 0, res)}
                  showError={trowError}
                  disabled={!vtr}
                  required={vtr}
                />
              <Forminput
                  title="KM Inicial"
                  label="Colocar somente números"
                  onChangeText={(res) => setField(17, 0, res)}
                  showError={trowError}
                  disabled={!vtr}
                  required={vtr}
                />
              <Forminput
                  title="KM Final"
                  label="Colocar somente números"
                  onChangeText={(res) => setField(18, 0, res)}
                  disabled={!vtr}
                  showError={trowError}
                  required={vtr}
                />
              <Forminput
                  title="Condições da VTR"
                  label="Em caso de problemas mecânicos, troca de VTR ou impossibilidade trafegar"
                  onChangeText={(res) => setField(19, 0, res)}
                  showError={trowError}
                  disabled={!vtr}
                  required={false}
                />
              
            </FormCard>

              <FormCard title="Detalhamento da Fiscalização" currentPage={6} totalPages={totalPages}>
                   <RadioButton
                      title="Tipos de Ação"
                      options={["Incurssão em Viatura", "Incursão a Pé", "Fiscalização Embarcada",
                                "Sobrevoo", "Fiscalização com Drone", "Bloqueio" ]}
                      onSelect={(res) => setField(20, 0, res)}
                      showError={trowError}
                   />

                   <TextArea 
                    title="Veículos Abordados em caso de Bloqueios"
                    label="colocar todas as informações dos veículos abordados (tipo, modelo, placa, origem e destino)"
                    onChangeText={(res) => setField(21, 0, res)}
                    showError={trowError}
                    required={false}
                    />

                    <Forminput
                      title="KM Percorridos (Viatura e a pé)"
                      label="Ex: 62km (viatura) e 4km (a pé)"
                      onChangeText={(res) => setField(22, 0, res)}
                      showError={trowError}
                    />

                    <DurationInput
                     title="Horas em viatura"
                     onChangeText={(res) => setField(23, 0, res? res +" (viatura)" : res)}
                     showError={trowError}
                    />

                    <DurationInput
                     title="Horas a Pé"
                     onChangeText={(res) => setField(23, 1, res? res +"(a pé)" : res)}
                      showError={trowError}
                    />

                    <RadioButton
                      title="Veículos Abordados (tipo)"
                      options={["Motocicleta", "Automóvel", "Caminhão",
                                " Onibus/Vã",]}
                      onSelect={(res) => setField(24, 0, res)}
                      required={false}
                   />

                   <TextArea
                    title="Descrição dos veículos abordados"
                    label="Modelo/Placa/Origem/Destino/Descrição"
                    onChangeText={(res) => setField(25, 0, res)}
                    required={false}
                   />

              </FormCard>

          

          <SubmitButton classname="my-10" title="enviar" onPress={() => handleSubmit(form)} />
        </View>
      </ScrollView>
    </View>
  );
}
