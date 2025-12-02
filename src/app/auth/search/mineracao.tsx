import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import ReusablePageLayout from "@/src/components/search/CasosPageLayout";
import images from "@/src/constants/images";
import db from "@/src/db/connection";
import { ExemploDeCasoTable, ExemploDeCaso } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "expo-router";

export default function MineracaoPage() {
  const [data, setData] = useState<ExemploDeCaso[]>([]);
  const router = useRouter();

  useEffect(() => {
    db.select()
      .from(ExemploDeCasoTable)
      .where(eq(ExemploDeCasoTable.categoria, "fauna"))
      .then((res) => setData(res as ExemploDeCaso[]));
  }, []);

  return (
    <ReusablePageLayout
      imageComponent={
        <Image
          source={images.mineracaoLarge}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      }
      title="Mineração"
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