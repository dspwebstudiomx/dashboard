import express from "express";
import { readClientsFile, writeClientsFile } from "../utils/clientsFileUtils.js";

const router = express.Router();

// Obtener todos los clientes
router.get("/", (req, res) => {
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    res.status(200).json(clients);
  });
});

// Obtener cliente por ID
router.get("/:id", (req, res) => {
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const client = clients.find((c) => String(c.id) === String(req.params.id));
    if (!client) return res.status(404).send({ error: "Cliente no encontrado" });
    res.send(client);
  });
});

// Crear nuevo cliente
router.post("/", (req, res) => {
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const newClient = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: [],
      projects: [],
    };
    clients.push(newClient);
    writeClientsFile(clients, res, newClient);
  });
});

// Actualizar cliente
router.put("/:id", (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const clientIndex = clients.findIndex((c) => c.id === clientId);
    if (clientIndex === -1) return res.status(404).json({ error: "Cliente no encontrado" });
    clients[clientIndex] = { ...clients[clientIndex], ...req.body, updatedAt: new Date().toISOString() };
    writeClientsFile(clients, res, { message: "Cliente actualizado correctamente", client: clients[clientIndex] });
  });
});

// Eliminar cliente
router.delete("/:id", (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const updatedClients = clients.filter((client) => client.id !== clientId);
    writeClientsFile(updatedClients, res, { message: "Cliente eliminado correctamente" });
  });
});

export default router;