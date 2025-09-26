import { SubmitButton } from "@/src/components/SubmitButton";
import images from "@/src/constants/images";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import db from "@/src/db/connection";
import { infracoesTable, Infracao } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import FormCard from "@/src/components/report/FormCard";

const mockData = {
      "infractionType": "Reforma sem autorização",
      "infractionLaw": "Art. 67.da Resolução SIMA N° 05/2021 Realizar quaisquer atividades ou adotar conduta em desacordo com os objetivos da unidade de conservação, o seu plano de manejo e regulamentos: Multa de R$ 500,00 (quinhentos reais), majorada até R$ 10.000,00 (dez mil reais), mediante laudo técnico do órgão gestor da unidade de conservação.",
      "components": [
        {
          "name": "Fiscalização",
          "Fiscalização": {
            "type": "dropdown",
            "dropdown": ["Rotina", "Integrada ao pelotão", "Integrada a companhia", "Integrada ao batalhão"],
            "id": 0
          }
        },
        {
          "name": "Local",
          "Local": [
            {
              "type": "string",
              "name": "Estrada",
              "id": 1
            },
            {
              "type": "string",
              "name": "Bairro",
              "id": 2
            },
            {
              "type": "string",
              "name": "Setor",
              "id": 3
            },
            {
              "type": "string",
              "name": "Primeira estrutura",
              "id": 6
            },
            {
              "type": "string",
              "name": "Latitude da primeira estrutura",
              "id": 7
            },
            {
              "type": "string",
              "name": "Longitude da primeira estrutura",
              "id": 8
            },
            {
              "type": "string",
              "name": "Segunda estrutura",
              "id": 9
            },
            {
              "type": "string",
              "name": "Latitude da segunda estrutura",
              "id": 10
            },
            {
              "type": "string",
              "name": "Longitude da segunda estrutura",
              "id": 11
            },
            {
              "type": "string",
              "name": "Longitude da unidade de conservação",
              "id": 13
            },
            {
              "type": "string",
              "name": "Latitude da unidade de conservação",
              "id": 14
            }
          ]
        },
        {
          "name": "Horario",
          "Horario": {
            "type": "date",
            "name": "Horário da infração",
            "id": 4
          }
        },
        {
          "name": "Informações Extras",
          "Informacoes Extras": [
            {
              "type": "string",
              "name": "Descrição da intervenção",
              "id": 12
            }
          ]
        },
        {
          "name": "Dados do Infrator",
          "Dados do Infrator": [
            {
              "type": "string",
              "name": "Nome do infrator",
              "id": 5
            }
          ]
        }
      ]
    }
  


export default function ProcedimentosPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [item, setItem] = useState<Infracao | null>(null);

  useEffect(() => {
    if (params.id) {
      db.select()
        .from(infracoesTable)
        .where(eq(infracoesTable.id, Number(params.id)))
        .then((res) => setItem(res[0] as Infracao));
    }
  }, [params.id]);

  return (
    <View className="flex-1">
      <View className="bg-[#fffdfd] pt-10 pb-5 border-x-hairline border-b-1 border-gray-900/30 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
          <TouchableOpacity
            className="flex justify-center items-center rounded-br-lg rounded-tr-lg"
            onPress={() => router.back()}
          >
            <images.leftArrow width={26} height={26} style={{ resizeMode: "contain", opacity: 0.9 }} />
          </TouchableOpacity>
          <View className=" bg-green-500/30 flex justify-center items-center rounded-full px-3 py-1">
            <Text className="text-gray-900/100 text-lg font-semibold">{item?.categoria ?? params.categoria}</Text>
          </View>
        </View>
        <Text className="text-gray-900 font-semibold text-3xl ml-7 ">{item?.nome_resumo ?? params.nome}</Text>
      </View>

      <View className="flex-1 items-center">
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View className="w-full ml-16 mt-14 mb-5 flex-row items-center">
            <Text className="text-gray-900 font-semibold text-2xl">Nome Completo</Text>
          </View>

          <View className="w-[90%] bg-white border border-green-100 rounded-2xl shadow shadow-black mb-14">
            <View className="flex-1 mx-5 my-7">
              <Text className="text-xl font-medium text-stone-900 mb-2">
                {item?.nome_compelto}
              </Text>
            </View>
          </View>

          <View className="w-full ml-16 mb-5 flex-row items-center">
            <Text className="text-gray-900 font-semibold text-2xl">Natureza do Dano</Text>
            <Text className="text-gray-900 font-semibold text-xl pl-2">(Infração/Crime)</Text>
          </View>

          <View className="w-[90%] bg-white border border-green-100 rounded-2xl shadow shadow-black mb-14">
            <View className="flex-1 mx-6 my-7">
              <Text className="text-lg text-stone-900 mb-2">
                {item?.tipo_ocorrencia}
              </Text>
            </View>
          </View>

          <View className="w-full ml-16 mb-5">
            <Text className="text-gray-900 font-semibold text-2xl">Procedimentos Operacionais</Text>
          </View>

          <View className="w-[90%] bg-white border border-green-100 rounded-2xl shadow shadow-black">
            <View className="flex-1 mx-6 my-7">
              {(item?.proc_OP ?? params.procedimento ?? "")
                .toString()
                .split("\n")
                .map((step, idx) =>
                  step.trim() ? (
                    <Text key={idx} className="text-xl text-stone-800 mb-5">
                      {step.trim()}
                    </Text>
                  ) : null
                )
              }
            </View>
          </View>

          <View className="w-full pt-10 items-center px-4">

              {(mockData.components ?? "")
                .toString()
                .split(",")
                .map((component, idx) =>
                    (
                    <FormCard key={idx}>
                      <Text>{component.trim()}</Text>
                    </FormCard>
                  )
                )
              }


          </View>
          

          <SubmitButton
            classname="h-[3rem] w-[9rem] mt-9 mb-10"
            textClass="text-xl"
            title="Prosseguir"
            onPress={() => router.push("/auth/search")}
          />
        </ScrollView>
      </View>
    </View>
  );
}