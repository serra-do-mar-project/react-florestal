import DatePicker from "@/src/components/report/DatePicker";
import DropdownBox from "@/src/components/report/DropdownBox";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import RadioButton from "@/src/components/report/RadioButton";
import TextArea from "@/src/components/report/TextArea";
import { SubmitButton } from "@/src/components/SubmitButton";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
      console.log(formData)
      return;
    }

    console.log("Formulário válido");
    console.log(formData)
  };

  const setField = (fieldIndex: number, valueIndex: number, value: string | string[] | null | undefined) => {
    if (!form[fieldIndex]) form[fieldIndex] = { [fieldIndex]: [] };
    
    // Converte array para string se necessário
    const stringValue = Array.isArray(value) ? value.join(', ') : (value);
    form[fieldIndex][fieldIndex][valueIndex] = stringValue;
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
              options={["Miguel Nema Neto", "Alvimar de Melo Amorim", "William Fonseca Celestino da Silva", "Alex Roberto dos Santos", "Paulo Sérgio Farias"]}
              onSelect={(option) => setField(0, 1, option)}
              showError={trowError}
            />
            <TextArea
              title="Outros"
              onChangeText={(option) => setField(1, 0, option)}
              showError={trowError}
              required={false}
            />
          </FormCard>

          

          <SubmitButton classname="my-10" title="enviar" onPress={() => handleSubmit(form)} />
        </View>
      </ScrollView>
    </View>
  );
}
