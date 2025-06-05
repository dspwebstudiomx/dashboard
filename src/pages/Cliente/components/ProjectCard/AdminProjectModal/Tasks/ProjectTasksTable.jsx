import React, { useState } from 'react';
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

	const handleAddTask = () => {
		setSelectedTask(null);
		setIsTaskModalOpen(true);
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
					`http://localhost:5000/api/clients/${clientId}/projects/${
						project.id || projectId
					}/tasks/${task.taskId || task.id}`,
					{ method: 'DELETE' }
				);
				if (onTasksChanged) onTasksChanged(); // Cambia aquí
			} catch (error) {
				console.error('Error al eliminar la tarea:', error);
				alert('Error al eliminar la tarea');
			}
		}
	};

	const handleAutoGenerateTasks = async () => {
		const newTasks = [];
		const now = new Date();
		const nowISO = now.toISOString();

		// Función para sumar días a una fecha
		const addDays = (date, days) => {
			const result = new Date(date);
			result.setDate(result.getDate() + days);
			return result.toISOString().split('T')[0];
		};

		// Obtener títulos existentes
		const existingTitles = (project.tasks || []).map((t) => t.title);

		// Generar tareas por secciones
		if (project.sections && Array.isArray(project.sections)) {
			project.sections.forEach((section, idx) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const title = `Sección: ${sectionName}`;
				if (!existingTitles.includes(title)) {
					const startDate = addDays(now, idx); // Cada sección inicia un día después
					const dueDate = addDays(now, idx + 3); // Dura 3 días
					newTasks.push({
						taskId: `${project.id || projectId}-sec-${idx}`,
						clientId,
						projectId: project.id || projectId,
						title,
						description: `Tarea para la sección ${sectionName}`,
						startDate,
						dueDate,
						updatedAt: nowISO,
						createdAt: nowISO,
						priority: 'Media',
						totalProgress: 0,
						status: 'Nuevo',
					});
				}
			});
		}

		// Generar tareas por servicios
		if (project.services && Array.isArray(project.services)) {
			// Asegurarse de que project.services sea un array
			project.services.forEach((service, idx) => {
				const serviceName = typeof service === 'string' ? service : service.name; // Asegurarse de que service.name esté definido
				const title = `Servicio: ${serviceName}`; // Título de la tarea
				// Verificar si ya existe una tarea con este título
				if (!existingTitles.includes(title)) {
					const startDate = addDays(now, idx); // Cada servicio inicia un día después
					const dueDate = addDays(now, idx + 2); // Dura 2 días
					// Agregar la tarea al array de nuevas tareas
					newTasks.push({
						taskId: `${project.id || projectId}-srv-${idx}`,
						clientId,
						projectId: project.id || projectId,
						title,
						description: `Tarea para el servicio ${serviceName}`,
						startDate,
						dueDate,
						priority: 'Media',
						totalProgress: 0,
						status: 'Nuevo',
						createdAt: nowISO,
						updatedAt: nowISO,
					});
				}
			});
		}

		// Verificar si hay nuevas tareas para agregar
		if (newTasks.length === 0) {
			alert('No hay nuevas tareas para generar.');
			return;
		}

		// Crear todas las tareas al mismo tiempo con una sola petición
		await fetch(
			`http://localhost:5000/api/clients/${clientId}/projects/${project.id || projectId}/tasks`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTasks),
			}
		);
		alert('Tareas generadas automáticamente con éxito.');
		if (typeof onTasksChanged === 'function') onTasksChanged();
	};

	// Función para agrupar tareas por sección y servicio
	const getGroupedTasks = () => {
		const grouped = []; // Array para almacenar las tareas agrupadas
		const sectionMap = {}; // Mapa para rastrear tareas de sección
		const serviceMap = {}; // Mapa para rastrear tareas de servicio

		// Agrupa por sección
		if (project.sections && Array.isArray(project.sections)) {
			project.sections.forEach((section) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const sectionTasks = (project.tasks || []).filter((t) =>
					t.title?.toLowerCase().includes(`sección: ${sectionName}`.toLowerCase())
				);
				if (sectionTasks.length > 0) {
					grouped.push({ type: 'section', name: sectionName, tasks: sectionTasks });
					sectionTasks.forEach((t) => (sectionMap[t.taskId || t.id] = true));
				}
			});
		}

		// Agrupa por servicio
		if (project.services && Array.isArray(project.services)) {
			project.services.forEach((service) => {
				const serviceName = typeof service === 'string' ? service : service.name;
				const serviceTasks = (project.tasks || []).filter(
					(t) =>
						!sectionMap[t.taskId || t.id] &&
						t.title?.toLowerCase().includes(`servicio: ${serviceName}`.toLowerCase())
				);
				if (serviceTasks.length > 0) {
					grouped.push({ type: 'service', name: serviceName, tasks: serviceTasks });
					serviceTasks.forEach((t) => (serviceMap[t.taskId || t.id] = true));
				}
			});
		}

		// Tareas que no pertenecen a sección ni servicio
		const otherTasks = (project.tasks || []).filter(
			(task) => !sectionMap[task.taskId || task.id] && !serviceMap[task.taskId || task.id]
		);
		if (otherTasks.length > 0) {
			grouped.push({ type: 'other', name: 'Otras', tasks: otherTasks });
		}

		return grouped;
	};

	return (
		<div className="w-full">
			<div className="flex items-center justify-between my-12">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
					Tareas del Proyecto
				</h2>
				{/* // Botones para agregar y generar tareas */}
				<div className="flex gap-2">
					<Button
						onClick={handleAddTask}
						text="Agregar"
						variant="primary"
						size="md"
						icon={FaPlus}
					/>
					<Button
						id="auto-generate-tasks-button"
						onClick={handleAutoGenerateTasks}
						text="Generar"
						variant="secondary"
						icon={FaPlus}
						size="md"
					/>
				</div>
			</div>
			<div className="overflow-x-auto rounded shadow text-sm">
				<table className=" min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th className="px-2 py-2 border-b text-left w-24">ID</th>
							<th className="px-2 py-2 border-b text-left w-48">Prioridad</th>
							<th className="px-2 py-2 border-b text-left" style={{ width: '35%' }}>
								Descripción
							</th>
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
							getGroupedTasks().map((group) => (
								<React.Fragment key={group.type + group.name}>
									<tr>
										<td
											colSpan={9}
											className="bg-gray-100 dark:bg-gray-700 font-bold text-left px-2 py-2"
										>
											{group.type === 'section'
												? `Sección: ${group.name}`
												: group.type === 'service'
												? `Servicio: ${group.name}`
												: 'Otras tareas'}
										</td>
									</tr>
									{group.tasks
										.slice() // Para no mutar el array original
										.sort((a, b) => {
											if (!a.startDate) return 1;
											if (!b.startDate) return -1;
											return new Date(a.startDate) - new Date(b.startDate);
										})
										.map((task) => (
											<tr
												key={task.taskId || task.id}
												className="hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<td className="px-2 py-2 border-b text-xs truncate">
													{task.taskId || task.id}
												</td>
												<td className="px-2 py-2 border-b text-xs">{task.priority}</td>

												<td
													className="px-2 border-b first-letter:uppercase truncate text-sm text-wrap"
													style={{ width: '35%' }}
												>
													{task.description}
												</td>
												<td
													className={`px-2 py-2 border-b border-gray-800 text-center text-sm w-20 ${
														task.startDate &&
														new Date(task.startDate) <= new Date(new Date().toDateString()) &&
														(task.totalProgress ?? 0) < 100 // Solo aplica rojo si el avance es menor a 100%
															? 'text-red-600 font-semibold'
															: ''
													}`}
												>
													{task.startDate}
												</td>
												<td className="px-2 py-2 border-b text-center text-xs w-20">
													{task.dueDate}
												</td>
												<td className="px-2 py-2 border-b text-center text-xs">
													{task.updatedAt
														? new Date(task.updatedAt).toLocaleString('es-ES', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
																hour: '2-digit',
																minute: '2-digit',
														  })
														: 'No disponible'}
												</td>
												<td className="px-2 py-2 border-b text-center h-16">
													<span
														className={`px-2 py-1 text-xs font-semibold rounded-full ${
															task.status === 'Completado'
																? 'bg-green-100 text-green-500 border border-green-500 w-30'
																: task.status === 'En Proceso'
																? 'bg-yellow-100 text-yellow-600 border border-yellow-500 px-3'
																: 'bg-blue-200 text-blue-600 border border-blue-500 w-30 px-6 py-1'
														}`}
													>
														{task.status}
													</span>
												</td>
												<td className="px-2 py-2 border-b text-center text-xs h-16">
													<span className="font-semibold text-gray-600 dark:text-gray-100">
														{task.totalProgress ? `${task.totalProgress} %` : '0 %'}
													</span>
												</td>
												<td className="px-2 py-2 border-b flex items-center justify-center gap-1 h-16">
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
						tasks={(project.tasks || []).filter((task) => task.startDate && task.dueDate)}
					/>
				</div>
			)}
		</div>
	);
};

export default ProjectTasksTable;
