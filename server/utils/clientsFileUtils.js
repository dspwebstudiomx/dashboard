import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENTS_FILE = path.join(__dirname, "../clients.json");

export const readClientsFile = (callback) => {
  fs.readFile(CLIENTS_FILE, "utf8", (err, data) => {
    if (err) callback(err, null);
    else callback(null, JSON.parse(data || "[]"));
  });
};

export const writeClientsFile = (clients, res, successMessage) => {
  fs.writeFile(CLIENTS_FILE, JSON.stringify(clients, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Error al guardar el archivo de clientes" });
    res.status(200).json(successMessage);
  });
};