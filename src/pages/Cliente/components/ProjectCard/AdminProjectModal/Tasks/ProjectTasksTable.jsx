import React, { useState, useCallback } from 'react';
import ProjectTaskForm from './ProjectTaskForm';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Button from '@components/Botones/Button';
import { MdDelete } from 'react-icons/md';
import GanttChart from '@components/Gantt/GanttChart';

const ProjectTasksTable = ({
	clientId,
	project,
	projectId,
	createTask,
	updateTask,
	onTasksChanged,
}) => {
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [showCompletedTasks, setShowCompletedTasks] = useState(false);
	const [collapsedGroups, setCollapsedGroups] = useState({
		'Tareas Completadas': false, // Inicializa el grupo "Tareas Completadas" como expandido
	}); // Estado para controlar grupos colapsados
	const [isCollapsed, setIsCollapsed] = useState(false); // Estado para alternar entre colapsar y expandir
	// Calcula el total de tareas completadas
	const totalCompletedTasks = (project.tasks || []).filter(
		(task) => task.status === 'Completado'
	).length;

	const handleAddTask = async () => {
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
	};

	const handleEditTask = (task) => {
		setSelectedTask(task);
		setIsTaskModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsTaskModalOpen(false);
		setSelectedTask(null);
	};

	const handleDeleteTask = async (task) => {
		if (window.confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`)) {
			try {
				await fetch(
					`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks/${task.taskId}`,
					{ method: 'DELETE' }
				);
				if (onTasksChanged) onTasksChanged();
			} catch (error) {
				console.error('Error al eliminar la tarea:', error);
				alert('Error al eliminar la tarea');
			}
		}
	};

	const handleAutoGenerateTasks = async () => {
		const newTasks = [];

		if (project.sections) {
			project.sections.forEach((section, index) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const taskTitle = `Sección: ${sectionName}`;

				const taskExists = (project.tasks || []).some((t) => t.title === taskTitle);

				if (!taskExists) {
					const startDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
					const dueDate = new Date(Date.now() + (index + 2) * 86400000).toISOString().split('T')[0];

					newTasks.push({
						clientId,
						projectId,
						taskId: `${projectId}-sec-${index + 1}`,
						title: taskTitle,
						status: 'Nuevo',
						priority: 'Baja',
						startDate,
						dueDate,
						totalProgress: 0,
					});
				}
			});
		}

		if (project.services) {
			project.services.forEach((service, index) => {
				const serviceName = typeof service === 'string' ? service : service.name;
				const taskTitle = `Servicio: ${serviceName}`;

				const taskExists = (project.tasks || []).some((t) => t.title === taskTitle);

				if (!taskExists) {
					const startDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
					const dueDate = new Date(Date.now() + (index + 2) * 86400000).toISOString().split('T')[0];

					newTasks.push({
						clientId,
						projectId,
						taskId: `${projectId}-srv-${index + 1}`,
						title: taskTitle,
						status: 'Nuevo',
						priority: 'Baja',
						startDate,
						dueDate,
						totalProgress: 0,
					});
				}
			});
		}

		if (newTasks.length === 0) {
			alert('Todas las tareas solicitadas ya existen.');
			return;
		}

		// Ordena las tareas por fecha de inicio
		newTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

		try {
			const response = await fetch(
				`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newTasks),
				}
			);

			if (!response.ok) {
				throw new Error('Error al guardar las tareas en el servidor');
			}

			const result = await response.json();
			console.log('Tareas guardadas en el servidor:', result.tasks);

			// Actualiza el estado local con las tareas existentes más las nuevas
			project.tasks = [...(project.tasks || []), ...newTasks];

			if (onTasksChanged) {
				onTasksChanged(project.tasks);
			}
		} catch (error) {
			console.error('Error al guardar las tareas:', error);
			alert('Error al guardar las tareas');
		}
	};

	const getGroupedTasks = useCallback(() => {
		const grouped = [];
		const sectionMap = {};
		const serviceMap = {};
		const completedMap = {};

		// Procesa los servicios
		if (project.services && Array.isArray(project.services)) {
			project.services.forEach((service) => {
				const serviceName = typeof service === 'string' ? service : service.name;
				const serviceTasks = (project.tasks || [])
					.filter((t) => t.title?.toLowerCase().includes(`servicio: ${serviceName}`.toLowerCase()))
					.filter((t) => t.status !== 'Completado') // Excluye tareas completadas
					.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Ordena por fecha de actualización
				if (serviceTasks.length > 0) {
					grouped.push({ type: 'service', name: serviceName, tasks: serviceTasks });
					serviceTasks.forEach((t) => (serviceMap[t.taskId || t.id] = true));
				}
			});
		}

		// Procesa las secciones
		if (project.sections && Array.isArray(project.sections)) {
			project.sections.forEach((section) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const sectionTasks = (project.tasks || [])
					.filter((t) => t.title?.toLowerCase().includes(`sección: ${sectionName}`.toLowerCase()))
					.filter((t) => t.status !== 'Completado') // Excluye tareas completadas
					.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Ordena por fecha de actualización
				if (sectionTasks.length > 0) {
					grouped.push({ type: 'section', name: sectionName, tasks: sectionTasks });
					sectionTasks.forEach((t) => (sectionMap[t.taskId || t.id] = true));
				}
			});
		}

		// Agrega las tareas que no pertenecen ni a servicios ni a secciones
		const otherTasks = (project.tasks || [])
			.filter((task) => !sectionMap[task.taskId || task.id] && !serviceMap[task.taskId || task.id])
			.filter((t) => t.status !== 'Completado') // Excluye tareas completadas
			.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Ordena por fecha de actualización
		if (otherTasks.length > 0) {
			grouped.push({ type: 'other', name: 'Otras', tasks: otherTasks });
		}

		// Agrega el grupo de tareas completadas si `showCompletedTasks` está activado
		if (showCompletedTasks) {
			const completedTasks = (project.tasks || [])
				.filter((task) => task.status === 'Completado')
				.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Ordena por fecha de actualización
			if (completedTasks.length > 0) {
				grouped.push({ type: 'completed', name: 'Tareas Completadas', tasks: completedTasks });
				completedTasks.forEach((t) => (completedMap[t.taskId || t.id] = true)); // Registra tareas completadas
			}
		}

		return grouped;
	}, [project.services, project.sections, project.tasks, showCompletedTasks]);

	// Actualiza el estado de collapsedGroups solo una vez, por ejemplo, en un efecto
	React.useEffect(() => {
		const allGroupNames = getGroupedTasks().map((group) => group.name);
		setCollapsedGroups((prev) => {
			const updatedGroups = { ...prev };
			allGroupNames.forEach((name) => {
				if (!(name in updatedGroups)) {
					updatedGroups[name] = false; // Inicializa como expandido
				}
			});
			return updatedGroups;
		});
	}, [getGroupedTasks]);

	const handleTaskDateChange = async (taskId, newStartDate, newEndDate) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						startDate: newStartDate,
						dueDate: newEndDate,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Error al actualizar las fechas en el servidor');
			}

			const updatedTask = await response.json();

			const updatedTasks = project.tasks.map((task) =>
				(task.taskId || task.id) === taskId
					? { ...task, startDate: updatedTask.startDate, dueDate: updatedTask.dueDate }
					: task
			);

			if (onTasksChanged) {
				onTasksChanged(updatedTasks);
			}
		} catch (error) {
			console.error('Error al actualizar las fechas de la tarea:', error);
			alert('Error al actualizar las fechas de la tarea');
		}
	};

	const toggleGroupCollapse = (groupName) => {
		setCollapsedGroups((prev) => ({
			...prev,
			[groupName]: !prev[groupName],
		}));
	};

	const toggleAllGroups = () => {
		setCollapsedGroups((prev) => {
			const updatedGroups = {};
			Object.keys(prev).forEach((groupName) => {
				updatedGroups[groupName] = !isCollapsed;
			});
			return updatedGroups;
		});
		setIsCollapsed((prev) => !prev); // Alterna el estado
	};

	return (
		<div className="w-full">
			<div className="flex items-center justify-between my-12">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
					Tareas del Proyecto
				</h2>
				<div className="flex gap-2">
					<Button
						onClick={handleAddTask}
						text="Agregar Tarea Nuevo"
						aria-label="Agregar nueva tarea"
						variant="primary"
						size="md"
						icon={FaPlus}
					/>
					<Button
						id="auto-generate-tasks-button"
						aria-label="Generar tareas automáticamente"
						onClick={handleAutoGenerateTasks}
						text="Generar automáticamente"
						variant="secondary"
						icon={FaPlus}
						size="md"
					/>
					<Button
						id="toggle-completed-tasks-button"
						aria-label="Alternar tareas completadas"
						onClick={() => setShowCompletedTasks((prev) => !prev)}
						text={
							showCompletedTasks
								? `Ocultar Completados (${totalCompletedTasks})`
								: `Mostrar Completados (${totalCompletedTasks})`
						}
						variant="secondary"
						size="md"
					/>
					<Button
						id="toggle-all-groups-button"
						aria-label="Colapsar/Expandir todos los grupos"
						onClick={toggleAllGroups}
						text={isCollapsed ? 'Expandir Todo' : 'Colapsar Todo'}
						variant="secondary"
						size="md"
					/>
				</div>
			</div>
			<div className="overflow-x-auto rounded shadow text-base mt-20 ml-6 p-4">
				<table className="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th className="px-2 py-2 border-b text-left w-24">Ticket ID</th>
							<th className="px-2 py-2 border-b text-left w-12">Prioridad</th>
							<th className="px-2 py-2 border-b text-left">Descripción</th>
							<th className="px-2 py-2 border-b text-center w-28">Inicio</th>
							<th className="px-2 py-2 border-b text-center w-28">Término</th>
							<th className="px-2 py-2 border-b text-center w-40">Actualización</th>
							<th className="px-2 py-2 border-b text-center w-32">Estado</th>
							<th className="px-2 py-2 border-b text-center w-24">Avance</th>
							<th className="px-2 py-2 border-b text-center w-24">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{project.tasks && project.tasks.length > 0 ? (
							getGroupedTasks().map((group, groupIndex) => (
								<React.Fragment key={`${group.type}-${group.name}-${groupIndex}`}>
									<tr>
										<td
											colSpan={9}
											className="bg-gray-100 dark:bg-gray-700 font-bold text-left px-2 py-2 cursor-pointer"
											onClick={() => toggleGroupCollapse(group.name)}
										>
											{group.type === 'section'
												? `Sección: ${group.name}`
												: group.type === 'service'
												? `Servicio: ${group.name}`
												: group.type === 'completed'
												? 'Tareas Completadas'
												: 'Otras tareas'}
											<span className="float-right">{collapsedGroups[group.name] ? '▼' : '▲'}</span>
										</td>
									</tr>
									{!collapsedGroups[group.name] &&
										group.tasks.map((task) => (
											<tr
												key={task.taskId || task.id || `${groupIndex}-${Math.random()}`}
												className="hover:bg-gray-100 dark:hover:bg-gray-700 h-16"
											>
												<td className="px-2 py-2 text-xs truncate">{task.taskId || task.id}</td>
												<td className="px-2 py-2 text-xs text-center">
													<span
														className={`inline-block w-5 h-5 rounded-full ${
															task.priority === 'Alta'
																? 'bg-red-500 border-red-600 border'
																: task.priority === 'Media'
																? 'bg-yellow-500 border-yellow-600 border'
																: 'bg-green-500 border-green-600 border'
														}`}
														title={task.priority}
													></span>
												</td>
												<td
													className="p-2 py-3 first-letter:uppercase truncate text-sm text-wrap"
													style={{ width: '25%' }}
												>
													{task.description
														? task.description.split(' ').slice(0, 15).join(' ') +
														  (task.description.split(' ').length > 15 ? '...' : '')
														: 'Sin descripción, favor de llenarla.'}
												</td>
												<td
													className={`px-2 py-2 text-center text-sm w-32 whitespace-nowrap ${
														task.startDate &&
														new Date(task.startDate) <= new Date(new Date().toDateString()) &&
														(task.totalProgress ?? 0) < 100
															? 'text-red-600 font-semibold dark:text-red-400'
															: ''
													}`}
												>
													{task.startDate
														? new Date(task.startDate).toLocaleString('es-MX', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
																hour: '2-digit',
																minute: '2-digit',
														  })
														: 'No disponible'}
												</td>
												<td className="px-2 py-2 text-center text-xs w-32 whitespace-nowrap">
													{task.dueDate
														? new Date(task.dueDate).toLocaleString('es-MX', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
																hour: '2-digit',
																minute: '2-digit',
														  })
														: 'No disponible'}
												</td>
												<td className="px-2 py-2 text-center text-xs w-32 whitespace-nowrap">
													{task.updatedAt
														? new Date(task.updatedAt).toLocaleString('es-MX', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
																hour: '2-digit',
																minute: '2-digit',
														  })
														: 'No disponible'}
												</td>
												<td className="px-2 py-2 text-center h-20">
													<span
														className={`px-2 py-1 text-xs font-semibold rounded-full ${
															task.status === 'Completado'
																? 'bg-green-100 text-green-500 border border-green-500 w-30'
																: task.status === 'En Proceso'
																? 'bg-yellow-100 text-yellow-600 border border-yellow-500 px-3'
																: task.status === 'Cancelado'
																? 'bg-gray-100 text-gray-600 border border-gray-500 w-28 px-4 py-1'
																: task.status === 'Pendiente'
																? 'bg-blue-100 text-blue-600 border border-blue-500 w-28 px-4 py-1'
																: 'bg-transparent text-blue-600 border border-blue-500 w-28 px-6 py-1'
														}`}
													>
														{task.status}
													</span>
												</td>
												<td className="px-2 py-2 text-center text-base h-20">
													<span className="font-semibold text-gray-600 dark:text-gray-100">
														{task.totalProgress ? `${task.totalProgress} %` : '0 %'}
													</span>
												</td>
												<td className="px-2 py-2 flex items-center justify-center gap-1 h-20">
													<button
														className="text-blue-600 hover:text-blue-800 transition-colors mr-1"
														onClick={() => handleEditTask(task)}
														aria-label="Editar tarea"
													>
														<FaEdit className="text-xl" size={24} />
													</button>
													<button
														onClick={() => handleDeleteTask(task)}
														className="text-blue-600 hover:text-blue-800 transition-colors"
													>
														<MdDelete className="text-xl" />
													</button>
												</td>
											</tr>
										))}
								</React.Fragment>
							))
						) : (
							<tr>
								<td colSpan={9} className="px-2 py-6 text-center text-gray-500 border-b">
									No hay tareas
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{isTaskModalOpen && (
				<ProjectTaskForm
					isOpen={isTaskModalOpen}
					onClose={handleCloseModal}
					initialData={selectedTask}
					clientId={clientId}
					projectId={project.id}
					createTask={createTask}
					updateTask={updateTask}
				/>
			)}

			{project.tasks && project.tasks.length > 0 && (
				<div className="overflow-x-auto my-8">
					<GanttChart
						clientId={clientId}
						projectId={projectId}
						tasks={(project.tasks || []).filter((task) => task.startDate && task.dueDate)}
						onTaskClick={(task) => {
							// Si deseas abrir el modal solo al hacer clic en una tarea, puedes mantener esta lógica
							handleEditTask(task);
						}}
						onDateChange={(task, start, end) => {
							// Asegúrate de que `start` y `end` sean objetos Date válidos
							if (start instanceof Date && end instanceof Date) {
								handleTaskDateChange(task.taskId, start.toISOString(), end.toISOString());
							} else {
								console.error('Las fechas proporcionadas no son válidas:', { start, end });
							}
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ProjectTasksTable;
