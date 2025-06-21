import express from "express";
import { readClientsFile, writeClientsFile } from "../utils/clientsFileUtils.js";

const router = express.Router();

// Agregar tarea a cliente
// router.post("/:clientId/tasks", (req, res) => {
//   const clientId = parseInt(req.params.clientId, 10);
//   const newTask = req.body;
//   readClientsFile((err, clients) => {
//     if (err) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
//     const client = clients.find((c) => c.id === clientId);
//     if (!client) return res.status(404).json({ message: "Cliente no encontrado" });
//     client.tasks.push(newTask);
//     writeClientsFile(clients, res, { message: "Tarea agregada correctamente", task: newTask });
//   });
// });

// Agregar tareas a proyecto
router.post("/:clientId/projects/:projectId/tasks", (req, res) => {
  readClientsFile((err, clients) => {
    if (err || !Array.isArray(clients)) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
    const newTasks = Array.isArray(req.body) ? req.body : [req.body];
    project.tasks = [...(project.tasks || []), ...newTasks];
    writeClientsFile(clients, res, { message: "Tareas agregadas correctamente", tasks: project.tasks });
  });
});

// Actualizar tarea de proyecto
router.put("/:clientId/projects/:projectId/tasks/:taskId", (req, res) => {
  readClientsFile((err, clients) => {
    if (err || !Array.isArray(clients)) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
    const taskIndex = project.tasks.findIndex((t) => String(t.taskId) === String(req.params.taskId));
    if (taskIndex === -1) return res.status(404).json({ error: "Tarea no encontrada" });
    project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...req.body, updatedAt: new Date().toISOString() };
    writeClientsFile(clients, res, { message: "Tarea actualizada correctamente", task: project.tasks[taskIndex], tasks: project.tasks });
  });
});

// Eliminar tarea de proyecto
router.delete("/:clientId/projects/:projectId/tasks/:taskId", (req, res) => {
  readClientsFile((err, clients) => {
    if (err || !Array.isArray(clients)) return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
    const taskIndex = project.tasks.findIndex((t) => String(t.taskId) === String(req.params.taskId));
    if (taskIndex === -1) return res.status(404).json({ error: "Tarea no encontrada" });
    project.tasks.splice(taskIndex, 1);
    writeClientsFile(clients, res, { message: "Tarea eliminada correctamente", tasks: project.tasks });
  });
});

export default router;