import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import ReusablePageLayout from "@/src/components/search/CasosPageLayout";
import images from "@/src/constants/images";
import db from "@/src/db/connection";
import { ExemploDeCasoTable, ExemploDeCaso } from "@/src/db/schema";
import { eq, or } from "drizzle-orm";
import { useRouter } from "expo-router";

export default function ConstrucaoPage() {
  const [data, setData] = useState<ExemploDeCaso[]>([]);
  const router = useRouter();

  useEffect(() => {
    db.select()
      .from(ExemploDeCasoTable)
      .where(or(
        eq(ExemploDeCasoTable.categoria, "Reforma"),
        eq(ExemploDeCasoTable.categoria, "Construção e/ou Ampliação")
      ))
      .then((res) => setData(res as ExemploDeCaso[]));
  }, []);

  return (
    <ReusablePageLayout
      imageComponent={
        <Image
          source={images.construcaoLarge}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      }
      title="Construção"
      data={data}
      onDropdownPress={(item: ExemploDeCaso) =>
        router.push({
          pathname: "/auth/search/procedimentos",
          params: {
            id: item.id,
          },
        })
      }
    />
  );
}