import React from 'react';
import Modal from '@components/Modal';
import { useProjectTasks } from './useProjectTasks';
import GeneralProjectInfo from './GeneralProjectInfo';

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project, clientId }) => {
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
	} = useProjectTasks({ clientId, project, isOpen });

	return (
		<>
			<GeneralProjectInfo
				isOpen={isOpen}
				onClose={onClose}
				project={project}
				successMessage={successMessage}
				setShowTaskModal={setShowTaskModal}
				tasks={tasks}
				handleEditTaskClick={handleEditTaskClick}
				handleDeleteTask={handleDeleteTask}
				handleEditTask={handleEditTask}
			/>

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

export default AdminProjectModal;
