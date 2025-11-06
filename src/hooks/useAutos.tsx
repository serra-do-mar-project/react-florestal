import db from "@/src/db/connection";
import { AutosDeInfracaoTable, ExemploDeCaso, NewAutosDeInfracao, AutosDeInfracao } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type MountParams = {
  item: ExemploDeCaso | null;
  form: Record<string, any> | any[] | undefined;
};


export function MountAuto({ item, form }: MountParams) {
  const template = item?.modelo?.toString() ?? "";
  let auto_gerado = template;
  console.log(form);

  (form || []).forEach((f: any) => {
    const idx = f?.id;
    const val = (f?.value ?? "") as string;
    auto_gerado = auto_gerado.replace(new RegExp(`__${idx}__`, "g"), val);
    auto_gerado = auto_gerado.replace(new RegExp(`\\{\\s*${idx}\\s*\\}`, "g"), val);
  });
  auto_gerado = auto_gerado.replace(/[{}]/g, "");



  if (!item) {
    console.warn("Item não carregado");
    return;
  }

  const newAuto: NewAutosDeInfracao = {
    id_exemplocaso: item.id,
    nome_resumo: item.nome_resumo,
    descricao: auto_gerado,
    tags: item.tags ?? undefined,
    categoria: item.categoria,
    data: new Date().toLocaleString(),
  };

  return newAuto;
}


type addAutos = {
  onSuccess?: () => void;
  newAuto: NewAutosDeInfracao;
};

export async function addAuto({ newAuto, onSuccess }: addAutos) {

  try {
    await db.insert(AutosDeInfracaoTable).values(newAuto);
    console.log("Auto salvo com sucesso");
    if (onSuccess) onSuccess();

  } catch (err) {
    console.error("Erro ao salvar auto:", err);
  }
}

export async function fetchAutos(): Promise<AutosDeInfracao[]> {
  try {
    const rows: AutosDeInfracao[] = await db.select().from(AutosDeInfracaoTable);
    return rows ?? [];
  } catch (e) {
    console.error("Erro ao carregar autos do DB:", e);
    return [];
  }
}

export async function deleteAutos(ids: number[]): Promise<void> {
  if (!ids || ids.length === 0) return;
  try {
    for (const id of ids) {
      await db.delete(AutosDeInfracaoTable).where(eq(AutosDeInfracaoTable.id, id));
    }
    console.log('Autos deletados:', ids);
  } catch (e) {
    console.error('Erro ao deletar autos:', e);
    throw e;
  }
}

