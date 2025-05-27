import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  cpf: text().primaryKey(),
  senha: text().notNull(),
});
