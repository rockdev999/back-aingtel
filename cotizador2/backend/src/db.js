import mysql from "mysql2/promise";
import {
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DB_HOST,
} from "./config.js";

export const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

// Función para probar la conexión
// (async () => {
//   try {
//     // Realizar una consulta simple para verificar la conexión
//     const [rows] = await connection.query("SELECT 1 + 1 AS result");
//     console.log("Conexión exitosa a la base de datos:", rows[0].result); // Mostrar el resultado de la consulta
//   } catch (error) {
//     console.error("Error conectando a la base de datos:", error);
//   }
// })();
