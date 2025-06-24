import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import ReusablePageLayout from "@/src/components/searchComponents/CasosPageLayout";
import images from "@/src/constants/images";
import db from "@/src/db/connection";
import { infracoesTable, Infracao } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "expo-router";

export default function ConstrucaoPage() {
  const [data, setData] = useState<Infracao[]>([]);
  const router = useRouter();

  useEffect(() => {
    db.select()
      .from(infracoesTable)
      .where(eq(infracoesTable.categoria, "fauna"))
      .then((res) => setData(res as Infracao[]));
  }, []);

  return (
    <ReusablePageLayout
      imageComponent={
        <Image
          source={images.construcao}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      }
      title="Construção"
      data={data}
      onDropdownPress={(item: Infracao) =>
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