import React, { useState } from 'react';
import ProjectTaskForm from './ProjectTaskForm';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Button from '@components/Botones/Button';
import { MdDelete } from 'react-icons/md';

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
		let uniqueBase = Date.now();
		const now = new Date().toISOString();

		// Obtener títulos existentes
		const existingTitles = (project.tasks || []).map((t) => t.title);

		// Generar tareas por secciones
		if (project.sections && Array.isArray(project.sections)) {
			project.sections.forEach((section, idx) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const title = `Sección: ${sectionName}`;
				if (!existingTitles.includes(title)) {
					newTasks.push({
						taskId: `${uniqueBase}-sec-${idx}`,
						clientId,
						projectId: project.id || projectId,
						title,
						description: `Tarea para la sección ${sectionName}`,
						startDate: '',
						dueDate: '',
						updatedAt: now,
						createdAt: now,
						priority: 'Media',
						totalProgress: 0,
						status: 'Nuevo',
					});
				}
			});
		}

		// Generar tareas por servicios
		if (project.services && Array.isArray(project.services)) {
			project.services.forEach((service, idx) => {
				const serviceName = typeof service === 'string' ? service : service.name;
				const title = `Servicio: ${serviceName}`;
				if (!existingTitles.includes(title)) {
					newTasks.push({
						taskId: `${uniqueBase}-srv-${idx}`,
						clientId,
						projectId: project.id || projectId,
						title,
						description: `Tarea para el servicio ${serviceName}`,
						startDate: '',
						dueDate: '',
						priority: 'Media',
						totalProgress: 0,
						status: 'Nuevo',
						createdAt: now, // <-- aquí
						updatedAt: now, // <-- aquí
					});
				}
			});
		}

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
		if (typeof onTasksChanged === 'function') onTasksChanged();
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
							<th className="px-2 py-2 border-b text-left w-48">Título</th>
							<th className="px-2 py-2 border-b text-left w-64">Descripción</th>
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
							[...project.tasks]
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
										<td className="px-2 py-2 border-b first-letter:uppercase text-sm truncate">
											{task.title}
										</td>
										<td className="px-2 py-2 border-b first-letter:uppercase text-xs truncate">
											{task.description}
										</td>
										<td
											className={`px-2 py-2 border-b border-gray-800 text-center text-xs ${
												task.startDate &&
												new Date(task.startDate) <= new Date(new Date().toDateString()) &&
												(task.totalProgress ?? 0) < 100 // Solo aplica rojo si el avance es menor a 100%
													? 'text-red-600 font-semibold'
													: ''
											}`}
										>
											{task.startDate}
										</td>
										<td className="px-2 py-2 border-b text-center text-xs">{task.dueDate}</td>
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
										<td className="px-2 py-2 border-b text-center">
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
										<td className="px-2 py-2 border-b text-center text-xs">
											<span className="font-semibold text-gray-600 dark:text-gray-100">
												{task.totalProgress ? `${task.totalProgress} %` : '0 %'}
											</span>
										</td>
										<td className="px-2 py-2 border-b flex items-center justify-center gap-1">
											<button
												className="text-blue-600 hover:text-blue-800 transition-colors mr-1"
												onClick={() => handleEditTask(task)}
												aria-label="Editar tarea"
											>
												<FaEdit className="text-xl" />
											</button>
											<button
												onClick={() => handleDeleteTask(task)}
												className="text-blue-600 hover:text-blue-800 transition-colors"
											>
												<MdDelete className="text-xl" />
											</button>
										</td>
									</tr>
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
		</div>
	);
};

export default ProjectTasksTable;
