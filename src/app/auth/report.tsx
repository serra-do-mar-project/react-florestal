import DropdownBox from "@/src/components/report/DropdownBox";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import { DurationInput } from "@/src/components/report/DurationInput";
import RadioButton from "@/src/components/report/RadioButton";
import TextArea from "@/src/components/report/TextArea";
import { SubmitButton } from "@/src/components/SubmitButton";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@/src/components/report/DateTimePicker";
import { useFormManager } from "@/src/hooks/useFormManager";
import { AutosDeInfracao } from "@/src/db/schema";
import { AutosDeInfracaoModal } from "@/src/components/report/AutosDeInfracaoModal";
import { EnviarRelatorio } from "@/src/lib/utils";
import { useUserStore } from "@/src/store/userStore";
import AttachPressable from "@/src/components/report/AttachPressable";



export default function ReportPage() {
  const { token } = useUserStore();

  const [vtr, setVtr] = useState<boolean>(true);
  const [autosDeInfracao, setAutosDeInfracao] = useState<boolean>(false);
  const [autosSelected, setAutosSelected] = useState<AutosDeInfracao[]>([]);
  const [formKey, setFormKey] = useState<number>(0);

  const {
    setField,
    handleSubmit,
    trowError,
    resetForm
  } = useFormManager({
    onSubmitSuccess: async (formData) => {
      if (formData?.outros_equipe && formData.outros_equipe.length > 0) {
        formData.equipe_em_atuacao = formData.equipe_em_atuacao + ', ' + formData.outros_equipe;
      }
      delete formData.outros_equipe;
      formData.autoinfracao = autosSelected.map((item) => ({
        id_exemplocaso: item.id_exemplocaso,
        data: item.data,
        descricao: item.descricao,
      }));
      const status = await EnviarRelatorio(token as string, formData, autosSelected);
      if (status.success) {
        // successful submit: reset form state and local UI state
        resetForm();
        setAutosSelected([]);
        setVtr(true);
        setAutosDeInfracao(false);
        // bump key to remount children (clears internal component state like DropdownBox)
        setFormKey((k) => k + 1);
      }
    },
    onSubmitError: (formData) => {
      console.log("Erro no envio do formulário");
    }
  });

  const totalPages = 7;

  return (
    <View className="flex w-full h-full">
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <Text className="text-gray-900 font-semibold text-3xl ml-7">Relátorio diário</Text>
      </View>
      <ScrollView className="flex-1">
        <View key={formKey} className="pt-10 items-center px-4">
          {/* Equipe */}
          <FormCard title="Equipe" currentPage={1} totalPages={totalPages}>
            <DropdownBox
              title="Nome da equipe"
              options={[
                { valor: "charlie_sede_diurno", nome: "Charlie Sede Diurno" },
                { valor: "charlie_rp_diurno", nome: "Charlie RP Diurno" },
                { valor: "charlie_rp_noturno", nome: "Charlie RP Noturno" },
                { valor: "delta_sede_diurno", nome: "Delta Sede Diurno" },
                { valor: "delta_rp_diurno", nome: "Delta RP Diurno" },
                { valor: "delta_rp_noturno", nome: "Delta RP Noturno" }
              ]}
              onSelect={(option) => setField("equipe", option, true)}
              showError={trowError}
            />
            <RadioButton
              title="Equipe em Atuação"
              options={["Miguel Nema Neto", "Alvimar de Melo Amorim", "William Fonseca Celestino da Silva",
                "Alex Roberto dos Santos", "Paulo Sérgio Farias", "Alexandro dos Santos", "Luciano José da Silva",
                "Valdenei Esbruzzi", "Alef Irmão de Moura", "Leonardo Sant'Anna Martins", "Genivaldo Duque da Silva",
                "Brian Luiz Gomes Mortensen Ferreira", "Lucas Tomi Assai", "Maurilio Costa Ramos", "João Leonardo",
                "Elson da Silva", "Renilson Luiz", "Jenifer de Magalhães luz", "Davidson Fernandes Raimundo", "Vanessa Trally Bard",
                "Fabio Henrique Paiva de Souza", "Ailton Silva Souza", "Anthony Elias Galdino Ramos", "Marcos Antônio Ramos Lima"]}
              onSelect={(option) => setField("equipe_em_atuacao", option)}
              showError={trowError}
            />
            <TextArea
              title="Outros"
              onChangeText={(option) => setField("outros_equipe", option, false)}
              showError={trowError}
              required={false}
            />
          </FormCard>

          <FormCard title="Dados da Ação" currentPage={2} totalPages={totalPages}>
            <TextArea
              title="Órgãos e Instituições envolvidas"
              label="Preencher com os nomes e pelo menos um documento (RG, CPF, RE, Matrícula, etc...) - PAMB, Bombeiros, Polícia Rodoviária, CETESB, Prefeitura, etc."
              onChangeText={(res) => setField("orgaos_e_instituicoes_envolvadas", res)}
              required={true}
              showError={trowError}
            />

            <Forminput
              title="Responsável pelo preenchimento"
              label="(Nome e CNV)"
              onChangeText={(res) => setField("responsavel", res)}
              showError={trowError} />

            <DateTimePicker
              title="Data e hora do início da ação"
              showError={trowError}
              onDateChange={(res) => {
                setField("data_hora_inicio_acao", res.join(" "));
              }}
            />

            <DateTimePicker
              title="Data e hora do término da ação"
              showError={trowError}
              onDateChange={(res) => {
                setField("data_hora_termino_acao", res.join(" "));
              }}
            />

            <DropdownBox
              title="Origem da Ação"
              options={[
                { valor: "rotina", nome: "Rotina" },
                { valor: "planejamento_SIMUC", nome: "Planejamento SIM-UC" },
                { valor: "dejem_SIMUC", nome: "DEJEM SIM-UC" },
                { valor: "denuncia", nome: "Denúncia" },
                { valor: "atendimento_orgaos_externos", nome: "Atendimento a Órgãos Externos" },
                { valor: "demanda_solicitacao_interna", nome: "Demanda Solicitação Interna" }
              ]}
              onSelect={(res) => setField("origem", res)}
              showError={trowError}
            />

            <RadioButton
              title="Registro de ocorrência"
              multiSelect={false}
              options={[
                { valor: true, nome: "Sim" },
                { valor: false, nome: "Não" }
              ]}
              onSelect={(res) => setField("registro_ocorrencia", res)}
              showError={trowError}
            />
          </FormCard>

          <FormCard title="Localização" currentPage={3} totalPages={totalPages}>
            <RadioButton
              title="Área Fiscalizada Na Área Protegida"
              multiSelect={false}
              options={[
                { valor: true, nome: "Dentro" },
                { valor: false, nome: "Entorno (Zona de Amortecimento)" }
              ]}
              onSelect={(res) => setField("area_fiscalizada", res)}
              showError={trowError}
            />

            <RadioButton
              title="Município(s)"
              multiSelect={false}
              options={[
                { valor: "caraguatatuba", nome: "Caraguatatuba" },
                { valor: "paraibuna", nome: "Paraibuna" },
                { valor: "natividade_da_serra", nome: "Natividade da Serra" }
              ]}
              onSelect={(res) => setField("municipios", res)}
              showError={trowError}
            />

            {/* <Forminput
              title="Rua/Estrada/Trilha"
              label="Ex: Estrada do Pouso Alto"
              onChangeText={(res) => setField("rua_estrada_trilha", res)}
              showError={trowError}
            />

            <Forminput
              title="Número/Quilômetro"
              label="Ex: Km 04"
              onChangeText={(res) => setField("numero_km", res)}
              showError={trowError}
            />

            <Forminput
              title="Bairro"
              label="Ex: Bairro Rio Negro"
              onChangeText={(res) => setField("bairro", res)}
              showError={trowError}
            /> */}

            <RadioButton
              title="Setores Fiscalizados"
              options={[
                { valor: "caraguatatuba_norte", nome: "Caraguatatuba Norte" },
                { valor: "caraguatatuba_sul", nome: "Caraguatatuba Sul" },
                { valor: "alto_da_serra_norte", nome: "Alto da Serra Norte" },
                { valor: "alto_da_serra_sul", nome: "Alto da Serra Sul" }
              ]}
              onSelect={(res) => setField("setores", res)}
              showError={trowError}
            />

            <Forminput
              title="Especificação do Local"
              label="Ex.: Posse abandonada, Trilha em meio à mata, Rodovia Estadual, Estrada que liga Caraguatatuba à Salesópolis, etc."
              onChangeText={(res) => setField("especificacao_local", res)}
              showError={trowError}
            />
          </FormCard>

          <FormCard title="Fizcalização" currentPage={4} totalPages={totalPages}>
            <TextArea
              title="Relatório de Fiscalização"
              onChangeText={(res) => setField("relatorio", res)}
              showError={trowError}
              textHolder="Descrever de forma bem objetiva todas as atividade de fiscalização realizadas no período. Somente Fiscalização. Inserir relatório por área fiscalizada."
            />

            <TextArea
              title="Outras atividades"
              label="NÃO RELACIONADAS à fiscalização"
              onChangeText={(res) => setField("outras_atividades", res, false)}
              showError={trowError}
              required={false}
            />

            <Forminput
              title="Coordenadas geográficas"
              label="Ex: -23,70916 / -45,544281"
              onChangeText={(res) => setField("coordenadas", res)}
              showError={trowError}
            />

            {/* <Forminput
              title="Referência da coordenada"
              label="Ex: Guarita Base RP"
              onChangeText={(res) => setField("referencia_coordenada", res)}
              showError={trowError}
            /> */}
          </FormCard>

          <FormCard title="Dados da VTR" currentPage={5} totalPages={totalPages}>
            <RadioButton
              title="Foi feito uso de VTR?"
              options={[
                { valor: true, nome: "Sim" },
                { valor: false, nome: "Não" }
              ]}
              multiSelect={false}
              onSelect={(selectedOption) => setVtr(selectedOption === true)}
            />

            <Forminput
              title="Placa do veículo"
              onChangeText={(res) => setField("placa_vtr", res, vtr)}
              showError={trowError}
              disabled={!vtr}
              required={vtr}
            />
            <Forminput
              title="KM Inicial"
              label="Colocar somente números"
              onChangeText={(res) => setField("km_inicio", res, vtr)}
              showError={trowError}
              disabled={!vtr}
              required={vtr}
            />
            <Forminput
              title="KM Final"
              label="Colocar somente números"
              onChangeText={(res) => setField("km_final", res, vtr)}
              disabled={!vtr}
              showError={trowError}
              required={vtr}
            />
            <Forminput
              title="Condições da VTR"
              label="Em caso de problemas mecânicos, troca de VTR ou impossibilidade trafegar"
              onChangeText={(res) => setField("condicoes_vtr", res, false)}
              showError={trowError}
              disabled={!vtr}
              required={false}
            />

          </FormCard>

          <FormCard title="Detalhamento da Fiscalização" currentPage={6} totalPages={totalPages}>
            <RadioButton
              title="Tipos de Ação"
              options={[
                { valor: "incursao_viatura", nome: "Incursão em Viatura" },
                { valor: "incursao_pe", nome: "Incursão a Pé" },
                { valor: "fiscalizacao_embarcada", nome: "Fiscalização Embarcada" },
                { valor: "sobrevoo", nome: "Sobrevoo" },
                { valor: "fiscalizacao_drone", nome: "Fiscalização com Drone" },
                { valor: "bloqueio", nome: "Bloqueio" }
              ]}
              onSelect={(res) => setField("tipo_acao", res)}
              showError={trowError}
            />

            <TextArea
              title="Veículos Abordados em caso de Bloqueios"
              label="colocar todas as informações dos veículos abordados (tipo, modelo, placa, origem e destino)"
              onChangeText={(res) => setField("veiculos_abordados", res, false)}
              showError={trowError}
              required={false}
            />

            <RadioButton
              title="Veículos Abordados (tipo)"
              options={[
                { valor: "moto", nome: "Motocicleta" },
                { valor: "carro", nome: "Carro" },
                { valor: "caminhao", nome: "Caminhão" },
                { valor: "onibusVan", nome: "Ônibus/Vã" }
              ]}
              onSelect={(res) => setField("tipo_veiculo_abordado", res, false)}
              required={false}
            />

            <TextArea
              title="Descrição dos veículos abordados"
              label="Modelo/Placa/Origem/Destino/Descrição"
              onChangeText={(res) => setField("descricao_veiculos", res, false)}
              required={false}
            />

            <Forminput
              title="KM Percorridos (Viatura e a pé)"
              label="Ex: 62km"
              onChangeText={(res) => setField("km_percorrido", res)}
              showError={trowError}
            />

            <DurationInput
              title="Horas (em Viatura e a pé)"
              onChangeText={(res) => setField("horas_percorridas", res)}
              showError={trowError}
            />
          </FormCard>

          <FormCard contentClassName="ml-5" title="Autos de Infração" subTitle="Anexe ao menos 1 Auto" currentPage={7} totalPages={totalPages}>
            <AttachPressable onPress={() => setAutosDeInfracao(true)} autosSelected={autosSelected}/>
          </FormCard>
          <SubmitButton
            classname="w-full mb-10 mt-7"
            title="Enviar"
            onPress={() => { handleSubmit(); }}
          />
        </View>
      </ScrollView>

      <AutosDeInfracaoModal
        visible={autosDeInfracao}
        setVisible={setAutosDeInfracao}
        setSelected={setAutosSelected}
        resetKey={formKey}
      />
     
    </View>
  );
}
