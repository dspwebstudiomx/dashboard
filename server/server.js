import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url); // Obtener el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Constantes
const PORT = 5000; // Puerto del servidor
const CLIENTS_FILE = path.join(__dirname, "clients.json");

const app = express(); // Inicializar la aplicación de Express

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json({ limit: "100mb" })); // Aumenta el límite a 10 MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Para datos codificados en URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Función para leer el archivo JSON
const readClientsFile = (callback) => {
  fs.readFile(CLIENTS_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de clientes:", err);
      callback(err, null);
    } else {
      callback(null, JSON.parse(data || "[]"));
    }
  });
};

// Función para escribir en el archivo JSON
const writeClientsFile = (clients, res, successMessage) => {
  fs.writeFile(CLIENTS_FILE, JSON.stringify(clients, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el archivo de clientes:", err);
      return res.status(500).json({ error: "Error al guardar el archivo de clientes" });
    }
    console.log("Archivo clients.json guardado correctamente");
    res.status(200).json(successMessage);
  });
};

// Configuración de multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar colisiones
  },
});

const upload = multer({ storage });

// Rutas
// Obtener todos los clientes
app.get("/api/clients", (req, res) => {
  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    res.status(200).json(clients);
  });
});

// Obtener un cliente por ID
app.get("/api/clients/:id", (req, res) => {
  const clients = JSON.parse(fs.readFileSync(CLIENTS_FILE, "utf8"));
  const client = clients.find((c) => c.id === req.params.id);
  if (!client) {
    return res.status(404).send({ error: "Cliente no encontrado" });
  }
  res.send(client);
});

// Agregar un nuevo cliente
app.post("/api/clients", (req, res) => {
  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    const newClient = {
      id: Date.now(),
      ...req.body,
      tasks: [],
    };

    clients.push(newClient);
    writeClientsFile(clients, res, newClient);
  });
});

// Editar un cliente existente
app.put("/api/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id, 10);

  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    const clientIndex = clients.findIndex((c) => c.id === clientId);
    if (clientIndex === -1) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const updatedFields = req.body;

    // Actualiza los datos del cliente
    clients[clientIndex] = {
      ...clients[clientIndex],
      ...updatedFields,
    };

    writeClientsFile(clients, res, {
      message: "Cliente actualizado correctamente",
      client: clients[clientIndex],
    });
  });
});

// Agrega en clients.json la fecha de creación y la fecha de modificación del cliente
app.post("/api/clients", (req, res) => {
  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    const newClient = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(), // Fecha de creación
      updatedAt: new Date().toISOString(), // Fecha de modificación
      tasks: [],
    };

    clients.push(newClient);
    writeClientsFile(clients, res, newClient);
  });
});

// Actualizar un cliente (solo tareas)
app.put("/api/clients/:id/tasks", (req, res) => {
  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }
    const clientIndex = clients.findIndex(
      (c) => c.id === parseInt(req.params.id, 10)
    );
    if (clientIndex === -1) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }
    clients[clientIndex] = { ...clients[clientIndex], ...req.body };
    writeClientsFile(clients, res, clients[clientIndex]);
  });
});

// Eliminar un cliente
app.delete("/api/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id, 10);

  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    const updatedClients = clients.filter((client) => client.id !== clientId);
    writeClientsFile(updatedClients, res, {
      message: "Cliente eliminado correctamente",
    });
  });
});

// Ruta para agregar tareas a un cliente
app.post("/api/clients/:clientId/tasks", (req, res) => {
  const clientId = parseInt(req.params.clientId, 10); // Convertir clientId a número
  const newTask = req.body; // Recibir la nueva tarea desde el cuerpo de la solicitud

  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    // Verifica si el cliente existe
    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Agregar la nueva tarea al cliente
    client.tasks.push(newTask);

    // Guardar los cambios en el archivo JSON
    writeClientsFile(clients, res, {
      message: "Tarea agregada correctamente",
      task: newTask,
    });
  });
});

// Endpoint para agregar imágenes a un cliente
app.post("/api/clients/:clientId/image", upload.single("image"), (req, res) => {
  const clientId = parseInt(req.params.clientId, 10); // Convertir clientId a número
  const newImagePath = `/uploads/${req.file.filename}`; // Ruta relativa de la imagen

  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    // Verifica si el cliente existe
    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Actualizar el campo 'image' del cliente
    client.image = newImagePath;

    // Guardar los cambios en el archivo JSON
    writeClientsFile(clients, res, {
      message: "Imagen agregada correctamente",
      image: newImagePath,
    });
  });
});

// Actualizar los proyectos de un cliente
app.put("/api/clients/:id/projects", (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const { projects } = req.body;

  readClientsFile((err, clients) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    }

    const clientIndex = clients.findIndex((c) => c.id === clientId);
    if (clientIndex === -1) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Actualiza solo la propiedad projects
    clients[clientIndex].projects = projects;

    writeClientsFile(clients, res, {
      message: "Proyectos actualizados correctamente",
      projects: clients[clientIndex].projects,
    });
  });
});

// Marcar un proyecto como terminado
app.patch("/api/clients/:clientId/projects/:projectId/completed", (req, res) => {
  const clientId = parseInt(req.params.clientId, 10);
  const projectId = req.params.projectId;

  readClientsFile((err, clients) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    }

    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    if (!Array.isArray(client.projects)) {
      return res.status(404).json({ error: "El cliente no tiene proyectos" });
    }

    const project = client.projects.find((p) => String(p.id) === String(projectId));
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    project.completed = true;

    writeClientsFile(clients, res, {
      message: "Proyecto marcado como terminado",
      project,
    });
  });
});

// Endpoint para validar cupón
app.get("/api/cupones/validar", (req, res) => {
  const { codigo } = req.query;
  const cupones = [
    { codigo: "DESCUENTO10", descuento: 10, activo: true },
    { codigo: "DESCUENTO20", descuento: 20, activo: true },
  ];
  const cupon = cupones.find(
    (c) => c.codigo === codigo?.toUpperCase() && c.activo
  );
  if (cupon) {
    res.json({ valido: true, descuento: cupon.descuento });
  } else {
    res.json({ valido: false });
  }
});

// SOLO DEJA ESTE ENDPOINT para crear tareas en proyectos
app.post("/api/clients/:clientId/projects/:projectId/tasks", (req, res) => {
  readClientsFile((err, clients) => {
    if (err || !Array.isArray(clients)) {
      return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    }
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    // Permite recibir un arreglo de tareas o una sola tarea
    const newTasks = Array.isArray(req.body) ? req.body : [req.body];
    project.tasks = project.tasks || [];
    project.tasks.push(...newTasks);

    writeClientsFile(clients, res, {
      message: "Tareas creadas correctamente",
      tasks: project.tasks,
    });
  });
});

// Actualizar una tarea de un proyecto de un cliente
app.put("/api/clients/:clientId/projects/:projectId/tasks/:taskId", (req, res) => {
  readClientsFile((err, clients) => {
    console.log('PUT params:', req.params);
    if (err || !Array.isArray(clients)) {
      return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    }
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) {
      console.log('Cliente no encontrado:', req.params.clientId);
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) {
      console.log('Proyecto no encontrado:', req.params.projectId);
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    const taskIndex = project.tasks.findIndex((t) => String(t.taskId) === String(req.params.taskId));
    if (taskIndex === -1) {
      console.log('Tarea no encontrada:', req.params.taskId);
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    // Actualiza la tarea con los datos recibidos
    project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...req.body };

    writeClientsFile(clients, res, {
      message: "Tarea actualizada correctamente",
      client, // Devuelve el cliente actualizado
      task: project.tasks[taskIndex],
      tasks: project.tasks,
    });
  });
});

// Eliminar una tarea de un proyecto de un cliente
app.delete("/api/clients/:clientId/projects/:projectId/tasks/:taskId", (req, res) => {
  readClientsFile((err, clients) => {
    if (err || !Array.isArray(clients)) {
      return res.status(500).json({ error: "Error al leer el archivo de clientes" });
    }
    const client = clients.find((c) => String(c.id) === String(req.params.clientId));
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    const project = client.projects.find((p) => String(p.id) === String(req.params.projectId));
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    const taskIndex = project.tasks.findIndex((t) => String(t.taskId) === String(req.params.taskId));
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    // Elimina la tarea del proyecto
    project.tasks.splice(taskIndex, 1);

    writeClientsFile(clients, res, {
      message: "Tarea eliminada correctamente",
      tasks: project.tasks,
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
