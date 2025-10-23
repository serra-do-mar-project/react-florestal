import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export interface ExemploDeCaso {
  id: number;
  nome_resumo: string;
  nome_completo: string;
  palavra_chave: string;
  categoria: string;
  tipo_ocorrencia: string;
  tags?: string;
  proc_op: string;
  proc_adm: string;
  enq_pen: string;
  enq_adm: string;
  modelo: string;
  campos: string;
}

export const ExemploDeCasoTable = sqliteTable("exemplo_de_caso_table", {
  id: int().primaryKey({ autoIncrement: true }),
  nome_resumo: text().notNull(),
  nome_completo: text().notNull(),
  palavra_chave: text().notNull(),
  categoria: text().notNull(),
  tipo_ocorrencia: text().notNull(),
  tags: text(),
  proc_op: text().notNull(),
  proc_adm: text().notNull(),
  enq_pen: text().notNull(),
  enq_adm: text().notNull(),
  modelo: text().notNull(),
  campos: text().notNull(),
});


export interface NewAutosDeInfracao { 
  nome_resumo: string;
  data: string;
  tags?: string | null;
  modelo: string;
  categoria: string;
}

// Para dados lidos do banco (id sempre existe)
export interface AutosDeInfracao extends NewAutosDeInfracao {
  id: number;
}

export const AutosDeInfracaoTable = sqliteTable("autos_de_infracao_table", {
  id: int().primaryKey({ autoIncrement: true }),
  nome_resumo: text().notNull(),
  tags: text(),
  modelo: text().notNull(),
  data: text().notNull(),
  categoria: text().notNull()
});