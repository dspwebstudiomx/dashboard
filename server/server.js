import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constantes
const PORT = 5000;
const UPLOADS_DIR = path.join(__dirname, "uploads");
const CLIENTS_FILE = path.join(__dirname, "clients.json");

// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});
const upload = multer({ storage });

const app = express(); // Inicializar la aplicación de Express

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR)); // Servir archivos estáticos

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
      return res
        .status(500)
        .json({ error: "Error al guardar el archivo de clientes" });
    }
    res.status(200).json(successMessage);
  });
};

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

// Agregar un nuevo cliente
app.post("/api/clients", upload.single("image"), (req, res) => {
  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    const newClient = {
      id: Date.now(),
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Guardar la ruta del archivo
      tasks: [],
    };

    clients.push(newClient);
    writeClientsFile(clients, res, newClient);
  });
});

// Editar un cliente existente
app.put("/api/clients/:id", upload.single("image"), (req, res) => {
  const clientId = parseInt(req.params.id, 10);

  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    const clientIndex = clients.findIndex((client) => client.id === clientId);
    if (clientIndex === -1)
      return res.status(404).json({ error: "Cliente no encontrado" });

    const updatedClient = {
      ...clients[clientIndex],
      ...req.body,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : clients[clientIndex].image,
    };

    clients[clientIndex] = updatedClient;
    writeClientsFile(clients, res, updatedClient);
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

// Subir una imagen (ruta independiente)
app.post("/api/uploads", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "No se subió ningún archivo" });
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

// Ruta para agregar tareas a un cliente
app.post("/api/clients/:clientId/tasks", (req, res) => {
  const { clientId } = req.params;
  const { tasks } = req.body;

  readClientsFile((err, clients) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });

    // Verifica si el cliente existe
    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Actualiza las tareas del cliente
    client.tasks = tasks;
    writeClientsFile(clients, res, {
      message: "Tareas actualizadas correctamente",
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
