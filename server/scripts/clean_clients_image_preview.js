import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENTS_FILE = path.join(__dirname, '../clients.json');

function backupFile(srcPath) {
  const timestamp = Date.now();
  const backupPath = `${srcPath}.bak.${timestamp}`;
  fs.copyFileSync(srcPath, backupPath);
  return backupPath;
}

function cleanClientsFile() {
  if (!fs.existsSync(CLIENTS_FILE)) {
    console.error('clients.json no existe en', CLIENTS_FILE);
    process.exit(1);
  }

  const backupPath = backupFile(CLIENTS_FILE);
  console.log('Backup creado en:', backupPath);

  const raw = fs.readFileSync(CLIENTS_FILE, 'utf8');
  let clients;
  try {
    clients = JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error parseando clients.json:', err.message);
    process.exit(1);
  }

  let removedCount = 0;
  let fixedCount = 0;

  const cleaned = clients.map((client) => {
    const c = { ...client };
    if ('imagePreview' in c) {
      const ip = c.imagePreview;
      // Si imagePreview apunta a una ruta del servidor /uploads o a http://localhost:5000/uploads/...
      // y no es un blob:, podemos convertirlo a image relativa si procede.
      if (typeof ip === 'string' && ip.length > 0 && !ip.startsWith('blob:')) {
        // Si es una URL absoluta al servidor, convertir a ruta relativa
        try {
          const serverPrefix = 'http://localhost:5000';
          if (ip.startsWith(serverPrefix)) {
            const rel = ip.substring(serverPrefix.length);
            // Si client.image está vacío o distinto, actualizar
            if (!c.image || c.image !== rel) {
              c.image = rel;
              fixedCount++;
            }
          } else if (ip.startsWith('/uploads')) {
            if (!c.image || c.image !== ip) {
              c.image = ip;
              fixedCount++;
            }
          }
        } catch (e) {
          // ignore
        }
      }

      delete c.imagePreview;
      removedCount++;
    }
    return c;
  });

  fs.writeFileSync(CLIENTS_FILE, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`Limpieza completada. Removed imagePreview: ${removedCount}, converted to image: ${fixedCount}`);
  console.log('Archivo actualizado:', CLIENTS_FILE);
}

cleanClientsFile();
