app.post('/api/clients/:clientId/projects/:projectId/tasks', (req, res) => {
  const { clientId, projectId } = req.params;
  const newTask = req.body;

  // Busca el cliente
  const client = clients.find(c => c.id == clientId);
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });

  // Busca el proyecto
  const project = client.projects.find(p => p.id == projectId);
  if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });

  // Agrega la tarea al proyecto
  project.tasks = project.tasks || [];
  project.tasks.push(newTask);

  // Guarda el archivo clients.json (simulado)
  saveClientsToFile();

  res.json({ success: true, task: newTask });
});