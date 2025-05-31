// Supón que req.body contiene la tarea completa
const newTask = req.body;

// Busca el cliente y el proyecto
const client = clients.find(c => c.id == req.params.clientId);
const project = client.projects.find(p => p.id == req.params.projectId);

if (project) {
  // Asegúrate de guardar todos los campos
  project.tasks.push(newTask);
  // Guarda el archivo clients.json actualizado
  fs.writeFileSync('server/clients.json', JSON.stringify(clients, null, 2));
  res.json({ tasks: project.tasks });
} else {
  res.status(404).json({ error: 'Proyecto no encontrado' });
}