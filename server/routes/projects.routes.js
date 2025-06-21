import express from "express";
import { readClientsFile, writeClientsFile } from "../utils/clientsFileUtils.js";

const router = express.Router();

// Actualizar proyectos de un cliente
router.put("/:id/projects", (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const { projects } = req.body;
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const clientIndex = clients.findIndex((c) => c.id === clientId);
    if (clientIndex === -1) return res.status(404).json({ error: "Cliente no encontrado" });
    clients[clientIndex].projects = projects;
    writeClientsFile(clients, res, { message: "Proyectos actualizados correctamente", projects: clients[clientIndex].projects });
  });
});

// Marcar proyecto como terminado
router.patch("/:clientId/projects/:projectId/completed", (req, res) => {
  const clientId = parseInt(req.params.clientId, 10);
  const projectId = req.params.projectId;
  readClientsFile((err, clients) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const client = clients.find((c) => c.id === clientId);
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });
    if (!Array.isArray(client.projects)) return res.status(404).json({ error: "El cliente no tiene proyectos" });
    const project = client.projects.find((p) => String(p.id) === String(projectId));
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
    project.completed = true;
    writeClientsFile(clients, res, { message: "Proyecto marcado como terminado", project });
  });
});

export default router;