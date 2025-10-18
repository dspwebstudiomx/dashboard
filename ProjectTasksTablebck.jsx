export default async function handleAddTask({
	project,
	clientId,
	projectId,
	onTasksChanged,
	setSelectedTask,
	setIsTaskModalOpen,
}) {
	// Filtra las tareas que contienen "task" en el taskId o title
	const taskCount = (project.tasks || []).filter(
		(task) =>
			(typeof task.taskId === 'string' && task.taskId.includes('task')) ||
			(typeof task.title === 'string' && task.title.includes('task'))
	).length;

	// Si no hay tareas con "task", comienza el contador en 1
	const newTaskNumber = taskCount === 0 ? 1 : taskCount + 1;

	// Genera un título único con el número calculado
	const newTaskTitle = `Nueva Tarea ${newTaskNumber}`;
	const newTaskId = `${projectId}-task-${newTaskNumber}`; // Usa el número de tarea como parte del ID

	// Nueva tarea a enviar al servidor
	const newTask = {
		clientId,
		projectId,
		taskId: newTaskId,
		title: newTaskTitle,
		status: 'Pendiente',
		priority: 'Media',
		startDate: new Date().toISOString().split('T')[0],
		dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
		totalProgress: 0,
	};

	try {
		// Envía la nueva tarea al servidor
		const response = await fetch(
			`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTask),
			}
		);

		if (!response.ok) {
			throw new Error('Error al crear la nueva tarea en el servidor');
		}

		const createdTask = await response.json();

		// Actualiza las tareas locales
		if (onTasksChanged) {
			onTasksChanged([...project.tasks, createdTask]);
		}

		// Abre el modal con la nueva tarea
		setSelectedTask(createdTask);
		setIsTaskModalOpen(true);
	} catch (error) {
		console.error('Error al crear la nueva tarea:', error);
		alert('Error al crear la nueva tarea');
	}
}
