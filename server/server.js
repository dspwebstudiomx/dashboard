import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import clientsRoutes from "./routes/clients.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import couponsRoutes from "./routes/coupons.routes.js";

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

// Usa los routers
app.use("/api/clients", clientsRoutes);
app.use("/api/clients", projectsRoutes);
app.use("/api/clients", tasksRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/coupons", couponsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
