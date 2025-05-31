import React, { useState } from 'react';
import ProjectTaskForm from './ProjectTaskForm';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ProjectTasksTable = ({ clientId, project }) => {
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

	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
					Tareas del Proyecto: <span className="font-bold">{project.title}</span>
				</h2>
				<button
					onClick={handleAddTask}
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					<FaPlus /> Agregar tarea
				</button>
			</div>
			<div className="overflow-x-auto rounded shadow">
				<table className="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b text-left">Título</th>
							<th className="px-4 py-2 border-b text-left">Descripción</th>
							<th className="px-4 py-2 border-b text-left">Estado</th>
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
									<td className="px-4 py-2 border-b">{task.title}</td>
									<td className="px-4 py-2 border-b">{task.description}</td>
									<td className="px-4 py-2 border-b">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold ${
												task.status === 'Completado'
													? 'bg-green-100 text-green-700'
													: task.status === 'En Proceso'
													? 'bg-yellow-100 text-yellow-700'
													: 'bg-gray-200 text-gray-800'
											}`}
										>
											{task.status}
										</span>
									</td>
									<td className="px-4 py-2 border-b">
										<button
											onClick={() => handleEditTask(task)}
											className="text-blue-600 hover:text-blue-800 transition"
											title="Editar"
										>
											<FaEdit />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="px-4 py-6 text-center text-gray-500">
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
				/>
			)}
		</div>
	);
};

export default ProjectTasksTable;
