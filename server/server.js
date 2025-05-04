import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para el archivo JSON
const clientsFilePath = path.join(__dirname, "clients.json");

// Configuración de multer para guardar archivos con su nombre original
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, "_"); // Reemplazar espacios por guiones bajos
    cb(null, originalName); // Guardar con el nombre original
  },
});

const upload = multer({ storage });

const app = express(); // Inicializar la aplicación de Express

// Habilitar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir solicitudes desde este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Encabezados permitidos
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Servir archivos estáticos

// Función para leer el archivo JSON
const readClientsFile = (callback) => {
  fs.readFile(clientsFilePath, "utf8", (err, data) => {
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
  fs.writeFile(clientsFilePath, JSON.stringify(clients, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el archivo de clientes:", err);
      return res
        .status(500)
        .json({ error: "Error al guardar el archivo de clientes" });
    }
    res.status(200).json(successMessage);
  });
};

// Ruta para obtener todos los clientes
app.get("/api/clients", (req, res) => {
  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }
    res.status(200).json(clients);
  });
});

// Ruta para agregar un nuevo cliente
app.post("/api/clients", upload.single("image"), (req, res) => {
  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    const newClient = {
      id: Date.now(),
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      lastName2: req.body.lastName2,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      company: req.body.company,
      project: req.body.project,
      rfc: req.body.rfc,
      website: req.body.website,
      curp: req.body.curp,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      image: req.file
        ? `/uploads/${req.file.originalname.replace(/\s+/g, "_")}`
        : null, // Guardar la ruta completa del archivo
      tasks: [], // Inicializar tareas vacías
    };

    clients.push(newClient);
    writeClientsFile(clients, res, newClient);
  });
});

// Ruta para editar un cliente
app.put("/api/clients/:id", upload.single("image"), (req, res) => {
  const clientId = parseInt(req.params.id, 10);

  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    const clientIndex = clients.findIndex((client) => client.id === clientId);

    if (clientIndex === -1) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const updatedClient = {
      ...clients[clientIndex],
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      lastName2: req.body.lastName2,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      company: req.body.company,
      project: req.body.project,
      rfc: req.body.rfc,
      website: req.body.website,
      curp: req.body.curp,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      image: req.file
        ? `/uploads/${req.file.originalname.replace(/\s+/g, "_")}`
        : clients[clientIndex].image, // Mantener la imagen existente si no se sube una nueva
    };

    clients[clientIndex] = updatedClient;
    writeClientsFile(clients, res, updatedClient);
  });
});

// Ruta para eliminar un cliente
app.delete("/api/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id, 10);

  readClientsFile((err, clients) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de clientes" });
    }

    const updatedClients = clients.filter((client) => client.id !== clientId);
    writeClientsFile(updatedClients, res, {
      message: "Cliente eliminado correctamente",
    });
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
