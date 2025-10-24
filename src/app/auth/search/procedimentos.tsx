import { SubmitButton } from "@/src/components/SubmitButton";
import images from "@/src/constants/images";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import db from "@/src/db/connection";
import { ExemploDeCasoTable, ExemploDeCaso} from "@/src/db/schema";
import { eq } from "drizzle-orm";
import FormCard from "@/src/components/report/FormCard";
import { Section } from "@/src/hooks/useDynamicForm";
import {useFormManager} from "@/src/hooks/useFormManager";
import {MountAuto, addAuto} from "@/src/hooks/useAutos";


export default function ProcedimentosPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [item, setItem] = useState<ExemploDeCaso | null>(null);
  const [titleLineCount, setTitleLineCount] = useState<number>(0);

  useEffect(() => {
    if (params.id) {
      db.select()
        .from(ExemploDeCasoTable)
        .where(eq(ExemploDeCasoTable.id, Number(params.id)))
        .then((res) => setItem(res[0] as ExemploDeCaso));
    }
  }, [params.id]);

  useEffect(() => {
    if(item)
      console.log(item.modelo)
  }, [item]);




  const { form, setDynamicField, handleSubmit, trowError } = useFormManager();

  return (
    <View className="flex-1">
      <View className="bg-[#fffdfd] pt-10 pb-5 border border-gray-900/10 shadow shadow-black ">
        <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
          <TouchableOpacity
            className="flex justify-center items-center rounded-br-lg rounded-lg"
            onPress={() => router.back()}
          >
            <images.leftArrow width={26} height={26} style={{ resizeMode: "contain", opacity: 0.9 }} />
          </TouchableOpacity>
          <View className=" bg-green-500/30 flex justify-center items-center rounded-full px-3 pt-1 pb-0.5">
            <Text className="text-gray-900/100 text-lg font-semibold">{item?.categoria ?? params.categoria}</Text>
          </View>
        </View>
        <Text
          className={`text-gray-900 font-semibold ${titleLineCount <= 1 ? 'text-3xl' : 'text-2xl'} mx-6`}
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          minimumFontScale={1}
          onTextLayout={(e) => {
            const lines = e.nativeEvent.lines?.length ?? 0;
            setTitleLineCount(lines);
          }}
        >
          {item?.nome_resumo ?? params.nome}
        </Text>
      </View>


      <View className="flex-1 items-center">
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View className="w-full pt-10 items-center px-4">

            <FormCard title="Nome completo" subTitle="" currentPage={1} totalPages={item?.campos && JSON.parse(item?.campos).length + 3 || 0}>
                <View className="flex-1">
                  <Text className="text-xl font-BaiJamJuree_Medium text-stone-900 -mt-4">
                    {item?.nome_completo}
                  </Text>
                </View>
              </FormCard>
 

              <FormCard title="Natureza do Dano" subTitle="" currentPage={2} totalPages={item?.campos && JSON.parse(item?.campos).length + 3 || 0}>
                <View className="flex-1">
                  <Text className="text-lg font-BaiJamJuree_Medium text-stone-900 -mt-4">
                    {item?.tipo_ocorrencia}
                  </Text>
                </View>
              </FormCard>

              <FormCard title="Procedimentos Operacionais" subTitle="" currentPage={3} totalPages={item?.campos && JSON.parse(item?.campos).length + 3 || 0}>
                  <View className="flex-1 gap-5">
                  {(item?.proc_op ?? params.procedimento ?? "")
                    .toString()
                    .split("\n")
                    .map((step, idx) =>
                      step.trim() ? (
                        <Text key={idx} className="text-xl font-BaiJamJuree_Medium text-stone-800">
                          {step.trim()}
                        </Text>
                      ) : null
                    )
                  }
                </View>
              </FormCard>
              {item?.campos && JSON.parse(item?.campos).map((section: any, i: number) => (
                <Section currentPage={i + 4} totalPages={item?.campos && JSON.parse(item?.campos).length + 3 || 0} key={i} section={section} setFieldDynamic={setDynamicField} showError={trowError} />
              ))}
          </View>
          <SubmitButton
            classname="my-10"
            title="Enviar"
            onPress={async () => {
              const isValid = handleSubmit();
              if (!isValid) return;

               const newAuto = MountAuto({ item, form });
              if (!newAuto) return;
              
              await addAuto({ newAuto, onSuccess: () => router.push("/auth/infractions") });

            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}