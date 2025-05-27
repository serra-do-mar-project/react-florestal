import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);
export default db;
