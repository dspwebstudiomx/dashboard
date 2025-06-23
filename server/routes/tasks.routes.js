/*
  tasks.routes.js - Rutas para manejar tareas de proyectos de clientes
  ___________________________________________________________________________

  Autor: Daniel  Pérez
  Fecha: 22/06/2025
  Descripción:
  Este archivo define las rutas para manejar las tareas asociadas a proyectos de clientes.

  Las rutas permiten agregar, actualizar y eliminar tareas de proyectos específicos de un cliente.
  Utiliza un archivo JSON para almacenar la información de los clientes y sus proyectos.
  Las operaciones incluyen:
  - Agregar tareas a un proyecto específico de un cliente.
  - Actualizar tareas de un proyecto específico de un cliente.
  - Eliminar tareas de un proyecto específico de un cliente.
  - Manejo de errores para casos como cliente o proyecto no encontrado, y errores al leer el archivo de clientes.
  - Respuestas JSON para confirmar las operaciones realizadas.
  ___________________________________________________________________________
  Importante:
  - Asegúrate de que el archivo de clientes esté en el formato correcto y contenga los campos necesarios.
  - Las tareas se identifican por un ID único dentro del proyecto.
  - Las respuestas incluyen mensajes de éxito y los datos actualizados de las tareas.
  ___________________________________________________________________________
  Dependencias:
  - express: Para manejar las rutas y solicitudes HTTP.
  - utils/clientsFileUtils.js: Para leer y escribir el archivo de clientes.
  ___________________________________________________________________________
  Ejemplo de uso:
  - POST /clients/:clientId/projects/:projectId/tasks: Agrega una o varias tareas a un proyecto específico de un cliente.
  - PUT /clients/:clientId/projects/:projectId/tasks/:taskId: Actualiza una tarea específica de un proyecto de un cliente.  
  - DELETE /clients/:clientId/projects/:projectId/tasks/:taskId: Elimina una tarea específica de un proyecto de un cliente.
  ___________________________________________________________________________
  
*/

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