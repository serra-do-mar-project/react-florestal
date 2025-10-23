import db from "@/src/db/connection";
import { AutosDeInfracaoTable, AutosDeInfracao, ExemploDeCaso } from "@/src/db/schema";

type RegisterParams = {
  item: ExemploDeCaso | null;
  form: any[] | undefined;
  onSuccess?: () => void;
};

export default async function useRegisterAuto({ item, form, onSuccess }: RegisterParams) {
  const template = item?.modelo?.toString() ?? "";
              let auto_gerado = template;

              (form || []).forEach((f: any) => {
                const idx = f?.id;
                const val = (f?.value ?? "") as string;
                auto_gerado = auto_gerado.replace(new RegExp(`__${idx}__`, "g"), val);
                auto_gerado = auto_gerado.replace(new RegExp(`\\{\\s*${idx}\\s*\\}`, "g"), val);
              });
              auto_gerado = auto_gerado.replace(/[{}]/g, "");

              console.log("auto_gerado:", auto_gerado);

              if (!item) {
                console.warn("Item não carregado");
                return;
              }

              const novoAuto = {
                nome_resumo: item.nome_resumo,
                modelo: auto_gerado,
                tags: item.tags || "",
                categoria: item.categoria,
                data: new Date().toLocaleString(),
              };

              try {
                await db.insert(AutosDeInfracaoTable).values(novoAuto);
                console.log("Auto salvo com sucesso");
                if (onSuccess) onSuccess();

              } catch (err) {
                console.error("Erro ao salvar auto:", err);
              }
}
