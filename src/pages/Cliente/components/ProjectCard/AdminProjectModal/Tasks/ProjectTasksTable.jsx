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
	const [showCompletedTasks, setShowCompletedTasks] = useState(true); // Estado para controlar la visibilidad de tareas completadas

	// Calcula el total de tareas completadas
	const totalCompletedTasks = (project.tasks || []).filter(
		(task) => task.status === 'Completado'
	).length;

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
				if (onTasksChanged) onTasksChanged();
			} catch (error) {
				console.error('Error al eliminar la tarea:', error);
				alert('Error al eliminar la tarea');
			}
		}
	};

	const handleAutoGenerateTasks = () => {
		const generatedTasks = [
			{
				id: '1',
				title: 'Tarea generada 1',
				status: 'En Proceso',
				priority: 'Alta',
				startDate: new Date().toISOString(),
				dueDate: new Date(Date.now() + 86400000).toISOString(), // +1 día
				totalProgress: 0,
			},
			{
				id: '2',
				title: 'Tarea generada 2',
				status: 'Pendiente',
				priority: 'Media',
				startDate: new Date().toISOString(),
				dueDate: new Date(Date.now() + 172800000).toISOString(), // +2 días
				totalProgress: 0,
			},
		];

		// Simula agregar las tareas al proyecto
		if (onTasksChanged) {
			onTasksChanged([...project.tasks, ...generatedTasks]);
		}
	};

	const getGroupedTasks = () => {
		const grouped = [];
		const sectionMap = {};
		const serviceMap = {};

		if (project.sections && Array.isArray(project.sections)) {
			project.sections.forEach((section) => {
				const sectionName = typeof section === 'string' ? section : section.name;
				const sectionTasks = (project.tasks || [])
					.filter((t) => t.title?.toLowerCase().includes(`sección: ${sectionName}`.toLowerCase()))
					.filter((t) => showCompletedTasks || t.status !== 'Completado'); // Filtrar tareas completadas
				if (sectionTasks.length > 0) {
					grouped.push({ type: 'section', name: sectionName, tasks: sectionTasks });
					sectionTasks.forEach((t) => (sectionMap[t.taskId || t.id] = true));
				}
			});
		}

		if (project.services && Array.isArray(project.services)) {
			project.services.forEach((service) => {
				const serviceName = typeof service === 'string' ? service : service.name;
				const serviceTasks = (project.tasks || [])
					.filter(
						(t) =>
							!sectionMap[t.taskId || t.id] &&
							t.title?.toLowerCase().includes(`servicio: ${serviceName}`.toLowerCase())
					)
					.filter((t) => showCompletedTasks || t.status !== 'Completado'); // Filtrar tareas completadas
				if (serviceTasks.length > 0) {
					grouped.push({ type: 'service', name: serviceName, tasks: serviceTasks });
					serviceTasks.forEach((t) => (serviceMap[t.taskId || t.id] = true));
				}
			});
		}

		const otherTasks = (project.tasks || [])
			.filter((task) => !sectionMap[task.taskId || task.id] && !serviceMap[task.taskId || task.id])
			.filter((t) => showCompletedTasks || t.status !== 'Completado'); // Filtrar tareas completadas
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
				</div>
			</div>
			<div className="overflow-x-auto rounded shadow text-sm">
				<table className="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th className="px-2 py-2 border-b text-left w-24">ID</th>
							<th className="px-2 py-2 border-b text-left w-12">Prioridad</th>
							<th className="px-2 py-2 border-b text-left">Título</th>
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
									{group.tasks.map((task) => (
										<tr
											key={task.taskId || task.id}
											className="hover:bg-gray-100 dark:hover:bg-gray-700 h-16"
										>
											<td className="px-2 py-2 border-b text-xs truncate">
												{task.taskId || task.id}
											</td>
											<td className="px-2 py-2 border-b text-xs text-center w-12">
												<span
													className={`inline-block w-4 h-4 rounded-full ${
														task.priority === 'Alta'
															? 'bg-red-500'
															: task.priority === 'Media'
															? 'bg-yellow-500 border-yellow-600 border'
															: 'bg-green-500 border-green-600 border'
													}`}
													title={task.priority}
												></span>
											</td>
											<td
												className="p-2 py-3 border-b first-letter:uppercase truncate text-sm text-wrap"
												style={{ width: '25%' }}
											>
												{task.title}
											</td>
											<td
												className={`px-2 py-2 border-b border-gray-800 dark:border-gray-100 text-center text-sm w-20 ${
													task.startDate &&
													new Date(task.startDate) <= new Date(new Date().toDateString()) &&
													(task.totalProgress ?? 0) < 100
														? 'text-red-600 font-semibold dark:text-red-400'
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
