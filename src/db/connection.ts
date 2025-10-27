import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

// Descomente esse código caso queira limpar o banco local

// if (__DEV__) {
//   try {
//     SQLite.deleteDatabaseAsync("db.db");
//     console.log("✅ Banco de dados deletado (modo dev)");
//   } catch (e) {
//     console.error("Erro ao deletar o banco:", e);
//   }
// }


const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);
export default db;
