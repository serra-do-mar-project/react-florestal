import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export interface Infracao {
  id: number;
  nome_resumo: string;
  nome_compelto: string;
  palavra_chave: string;
  categoria: string;
  tags?: string;
  exemplo: string;
  definição: string;
  proc_OP: string;
  proc_ADM: string;
  enquad_PEN: string;
  enquad_ADM: string;
  formulario: string;
  tipo_ocorrencia: string;
  campos: string;
}

export const infracoesTable = sqliteTable("infracoes_table", {
  id: int().primaryKey({ autoIncrement: true }),
  nome_resumo: text().notNull(),
  nome_compelto: text().notNull(),
  palavra_chave: text().notNull(),
  categoria: text().notNull(),
  tags: text(),
  exemplo: text().notNull(),
  definição: text().notNull(),
  proc_OP: text().notNull(),
  proc_ADM: text().notNull(),
  enquad_PEN: text().notNull(),
  enquad_ADM: text().notNull(),
  formulario: text().notNull(),
  tipo_ocorrencia: text().notNull(),
  campos: text().notNull(),
});
