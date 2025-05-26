import Button from '@components/Botones/Button';
import Modal from '@components/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const ProjectTasks = ({ actions }) => {
	const {
		showTaskModal,
		setShowTaskModal,
		taskTitle,
		setTaskTitle,
		taskDescription,
		setTaskDescription,
		successMessage,
		tasks,
		taskPriority,
		setTaskPriority,
		taskStatus,
		setTaskStatus,
		editTask,
		setEditTask,
		handleCreateTask,
		handleDeleteTask,
		handleEditTaskClick,
		handleEditTask,
		resetTaskForm,
	} = actions;
	return (
		<>
			<h2 className="text-2xl font-semibold text-center uppercase mt-12">Tareas</h2>
			<div
				id="Asignacion-Tareas"
				className="flex flex-col md:flex-col gap-12 rounded-2xl shadow-sm bg-gray-50 p-8"
			>
				<div className="flex flex-col md:flex-row justify-end items-center gap-4">
					<Button text="Crear Tarea" icon={FaPlus} onClick={() => setShowTaskModal(true)} />
					{successMessage && <span className="text-green-600">{successMessage}</span>}
				</div>
				{/* Tabla que muestra las tareas creadas */}
				<div className="overflow-x-auto">
					<table className="min-w-full border-collapse border border-gray-200">
						<thead>
							<tr>
								<th className="border border-gray-200 px-4 py-2">ID</th>
								<th className="border border-gray-200 px-4 py-2">Título</th>
								<th className="border border-gray-200 px-4 py-2">Descripción</th>
								<th className="border border-gray-200 px-4 py-2">Prioridad</th>
								<th className="border border-gray-200 px-4 py-2">Estado</th>
								<th className="border border-gray-200 px-4 py-2">Editar/Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{tasks && tasks.length > 0 ? (
								tasks.map((task, index) => (
									<tr key={index}>
										<td className="border border-gray-200 px-4 py-2">{task.taskId}</td>
										<td className="border border-gray-200 px-4 py-2">{task.title}</td>
										<td className="border border-gray-200 px-4 py-2">{task.description}</td>
										<td className="border border-gray-200 px-4 py-2">{task.priority}</td>
										<td className="border border-gray-200 px-4 py-2">{task.status}</td>
										<td className="border border-gray-200 px-4 py-2">
											<button
												className="bg-yellow-500 text-white px-2 py-1 rounded"
												onClick={() => handleEditTaskClick(task)}
											>
												Editar
											</button>
											<button
												onClick={() => handleDeleteTask(task.taskId)}
												className="bg-red-500 text-white px-2 py-1 rounded ml-2"
											>
												Eliminar
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={6} className="text-center py-4 text-gray-500">
										No hay tareas creadas
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* Modal secundario para el formulario de tarea */}
			<Modal
				id="modal-tarea"
				isOpen={showTaskModal}
				onClick={() => {
					setShowTaskModal(false);
					setEditTask(null);
					resetTaskForm();
				}}
				title={editTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
			>
				<form
					onSubmit={editTask ? handleEditTask : handleCreateTask}
					className="flex flex-col gap-4 p-4"
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="taskTitle">Título de la tarea</label>
						<input
							type="text"
							placeholder="Título de la tarea"
							className="border px-2 py-1 rounded"
							value={taskTitle}
							onChange={(e) => setTaskTitle(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="taskDescription">Descripción de la tarea</label>
						<textarea
							placeholder="Descripción"
							className="border px-2 py-1 rounded"
							value={taskDescription}
							onChange={(e) => setTaskDescription(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="taskPriority">Prioridad</label>
						<select
							className="border px-2 py-1 rounded"
							value={taskPriority}
							onChange={(e) => setTaskPriority(e.target.value)}
							required
						>
							<option value="Baja">Baja</option>
							<option value="Media">Media</option>
							<option value="Alta">Alta</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="taskStatus">Estado</label>
						<select
							className="border px-2 py-1 rounded"
							value={taskStatus}
							onChange={(e) => setTaskStatus(e.target.value)}
							required
						>
							<option value="Nuevo">Nuevo</option>
							<option value="Pendiente">Pendiente</option>
							<option value="En Proceso">En Proceso</option>
							<option value="Terminado">Terminado</option>
						</select>
					</div>
					<div className="flex gap-2">
						<button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
							{editTask ? 'Guardar' : 'Crear'}
						</button>
						<button
							type="button"
							className="bg-gray-400 text-white px-4 py-1 rounded"
							onClick={() => {
								setShowTaskModal(false);
								setEditTask(null);
								resetTaskForm();
							}}
						>
							Cancelar
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default ProjectTasks;
