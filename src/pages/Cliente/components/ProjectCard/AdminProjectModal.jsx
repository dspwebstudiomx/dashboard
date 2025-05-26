import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import Priority from '../Priority';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import ServicesProjectTag from '../ServicesProjectTag';
import SectionsProjectTag from '../SectionsProjectTag';
import GrayLine from '@components/Lineas/GrayLine';
import Button from '@components/Botones/Button';
import { FaPlus } from 'react-icons/fa6';

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project, clientId }) => {
	// const [showFullDesc, setShowFullDesc] = useState(false);
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [tasks, setTasks] = useState([]);
	const [taskPriority, setTaskPriority] = useState('Baja');
	const [taskStatus, setTaskStatus] = useState('Nuevo'); // Nuevo estado para el status
	const [editTask, setEditTask] = useState(null); // NUEVO: estado para tarea en edición

	// Cargar tareas cuando se abre el modal o cambia el proyecto
	useEffect(() => {
		if (!clientId || !project?.id) {
			console.warn('clientId o project.id no definidos:', {
				clientId,
				projectId: project?.id,
			});
			return;
		}
		if (isOpen) {
			fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`)
				.then((res) => res.json())
				.then((data) => setTasks(data.tasks ?? []));
		}
	}, [isOpen, project, clientId]);

	const handleCreateTask = (e) => {
		e.preventDefault();
		if (!clientId || !project?.id) {
			alert('No se puede crear la tarea: faltan datos de cliente o proyecto.');
			return;
		}
		const newTask = {
			taskId: Date.now(), // Genera un id único para la tarea
			title: taskTitle,
			description: taskDescription,
			status: taskStatus,
			priority: taskPriority,
			clientId: clientId,
		};

		fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTask),
		})
			.then((res) => res.json())
			.then((data) => {
				setSuccessMessage('Tarea creada exitosamente.');
				setTasks(data.tasks ?? []);
				setTaskTitle('');
				setTaskDescription('');
				setTaskPriority('Baja');
				setTaskStatus('Nuevo');
				setShowTaskModal(false);
				setTimeout(() => setSuccessMessage(''), 3000);
			});
	};

	const handleDeleteTask = (taskId) => {
		if (!clientId || !project?.id) {
			alert('No se puede eliminar la tarea: faltan datos de cliente o proyecto.');
			return;
		}
		fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${taskId}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				setTasks(data.tasks ?? []);
				setSuccessMessage('Tarea eliminada exitosamente.');
				setTimeout(() => setSuccessMessage(''), 3000);
			});
	};

	// NUEVO: función para abrir modal en modo edición
	const handleEditTaskClick = (task) => {
		setEditTask(task);
		setTaskTitle(task.title);
		setTaskDescription(task.description);
		setTaskPriority(task.priority);
		setTaskStatus(task.status);
		setShowTaskModal(true);
	};

	// NUEVO: función para editar tarea
	const handleEditTask = (e) => {
		e.preventDefault();
		if (!clientId || !project?.id || !editTask) {
			alert('No se puede editar la tarea: faltan datos.');
			return;
		}
		const updatedTask = {
			...editTask,
			title: taskTitle,
			description: taskDescription,
			priority: taskPriority,
			status: taskStatus,
		};
		fetch(
			`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${editTask.taskId}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTask),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setSuccessMessage('Tarea editada exitosamente.');
				setTasks(data.tasks ?? []);
				setEditTask(null);
				setTaskTitle('');
				setTaskDescription('');
				setTaskPriority('Baja');
				setTaskStatus('Nuevo');
				setShowTaskModal(false);
				setTimeout(() => setSuccessMessage(''), 3000);
			});
	};

	return (
		<>
			<Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
				<div
					id="modal-content"
					className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-gray-100"
				>
					<div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-12 mb-8">
						<h2 id="titulo-proyecto" className="text-3xl text-center">
							{project.title}
						</h2>
						<Priority project={project} />
					</div>
					<div className="flex flex-col gap-6 py-12">
						<h2 className="text-2xl font-semibold">Descripción del Proyecto</h2>
						<span className="ml-4">
							<ProjectDescriptionInfoCard
								project={project}
								// isLongDescription={project.description.length > 100}
								// shortDesc={project.description.substring(0, 100)}
								// showFullDesc={showFullDesc}
								// setShowFullDesc={setShowFullDesc}
							/>
						</span>
					</div>

					<GrayLine />

					<div className="flex flex-col md:flex-col gap-12 py-12">
						<div className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
							<span className="ml-4">
								<ServicesProjectTag project={project} />
							</span>
						</div>
						<div className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
							<span className="ml-4">
								<SectionsProjectTag project={project} />
							</span>
						</div>
					</div>

					<GrayLine />

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
													{/* Botones para Editar o Eliminar tarea */}
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
				</div>
			</Modal>

			{/* Modal secundario para el formulario de tarea */}
			<Modal
				id="modal-tarea"
				isOpen={showTaskModal}
				onClick={() => {
					setShowTaskModal(false);
					setEditTask(null); // Limpia el estado de edición al cerrar
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
