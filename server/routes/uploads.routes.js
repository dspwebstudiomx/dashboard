import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Crear un router de Express
const router = express.Router();

// Definir __dirname manualmente para compatibilidad con ES Modules
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = path.dirname(__filename);

// Configuración de multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Inicializar multer con la configuración de almacenamiento
const upload = multer({ storage });

// Ruta para subir una imagen
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;