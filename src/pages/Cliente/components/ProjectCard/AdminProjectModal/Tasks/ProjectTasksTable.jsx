import React, { useState } from 'react';
import ProjectTaskForm from './ProjectTaskForm';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Button from '@components/Botones/Button';
import { MdDelete } from 'react-icons/md';

const ProjectTasksTable = ({ clientId, project, createTask, updateTask, onTaskDeleted }) => {
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
					`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${
						task.taskId || task.id
					}`,
					{ method: 'DELETE' }
				);
				if (onTaskDeleted) onTaskDeleted(); // Notifica al padre para recargar datos
			} catch (error) {
				console.error('Error al eliminar la tarea:', error);
				alert('Error al eliminar la tarea');
			}
		}
	};

	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-12">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
					Tareas del Proyecto
				</h2>
				<Button
					onClick={handleAddTask}
					text="Agregar Tarea"
					variant="primary"
					size="md"
					icon={FaPlus}
				/>
			</div>
			<div className="overflow-x-auto rounded shadow">
				<table className=" min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b text-left">ID Tarea</th>
							<th className="px-4 py-2 border-b text-left">Título</th>
							<th className="px-4 py-2 border-b text-left">Descripción</th>
							<th className="px-4 py-2 border-b text-left">Fecha Inicio</th>
							<th className="px-4 py-2 border-b text-left">Fecha Termino</th>
							<th className="px-4 py-2 border-b text-left">Estado</th>
							<th className="px-4 py-2 border-b text-left">Avance</th>
							<th className="px-4 py-2 border-b text-left">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{project.tasks && project.tasks.length > 0 ? (
							project.tasks.map((task) => (
								<tr
									key={task.taskId || task.id}
									className="hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<td className="px-4 py-4 border-b">{task.taskId || task.id}</td>
									<td className="px-4 py-4 border-b first-letter:uppercase">{task.title}</td>
									<td className="px-4 py-4 border-b first-letter:uppercase">{task.description}</td>
									<td className="px-4 py-4 border-b">{task.startDate}</td>
									<td className="px-4 py-4 border-b">{task.dueDate}</td>
									<td className="px-4 py-4 border-b">
										<span
											className={`px-4 py-1 rounded-full text-base font-semibold ${
												task.status === 'Completado'
													? 'bg-green-100 text-green-700'
													: task.status === 'En Proceso'
													? 'bg-yellow-100 text-yellow-700'
													: 'bg-blue-300 text-blue-800'
											}`}
										>
											{task.status}
										</span>
									</td>
									<td className="px-4 py-4 border-b">
										<span className="text-base font-semibold text-gray-600 dark:text-gray-100">
											{task.totalProgress ? `${task.totalProgress} %` : '0 %'}
										</span>
									</td>
									<td className="px-4 py-4 border-b flex items-center gap-0">
										<Button
											onClick={() => handleEditTask(task)}
											text="Editar"
											icon={FaEdit}
											variant="secondary"
											size="sm"
										/>
										<Button
											onClick={() => handleDeleteTask(task)}
											text="Eliminar"
											icon={MdDelete}
											variant="outline"
											size="sm"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={8} className="px-4 py-6 text-center text-gray-500 border-b">
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
