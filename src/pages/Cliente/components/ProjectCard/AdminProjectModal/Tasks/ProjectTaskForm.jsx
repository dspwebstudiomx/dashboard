import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import {
	FaRegEdit,
	FaRegCalendarAlt,
	FaFlag,
	FaListAlt,
	FaRegClock,
	FaCheckCircle,
	FaTimes,
} from 'react-icons/fa';

const ProjectTaskForm = ({
	isOpen,
	onClose,
	initialData,
	clientId,
	projectId,
	createTask,
	updateTask,
}) => {
	const [task, setTask] = useState(
		initialData || {
			taskId: Date.now(),
			clientId,
			projectId,
			title: '',
			description: '',
			startDate: '',
			dueDate: '',
			priority: 'Baja',
			totalProgress: 0,
			status: 'Nuevo',
		}
	);

	useEffect(() => {
		if (initialData) {
			setTask((prev) => ({
				...prev,
				...initialData,
				clientId: initialData.clientId || clientId,
				projectId: initialData.projectId || projectId,
			}));
		}
	}, [initialData, clientId, projectId]);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		let newValue = value;
		if (type === 'range' || name === 'totalProgress') {
			newValue = Number(value);
		}
		setTask((prev) => {
			let updatedTask = { ...prev, [name]: newValue };
			if (name === 'totalProgress') {
				if (newValue >= 100) {
					updatedTask.status = 'Completado';
				} else if (newValue >= 1) {
					updatedTask.status = 'En Proceso';
				} else if (newValue === 0) {
					updatedTask.status = 'Nuevo';
				}
			}
			return updatedTask;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validación de fechas
		if (task.startDate && task.dueDate && task.dueDate < task.startDate) {
			alert('La fecha de entrega no puede ser anterior a la fecha de inicio.');
			return;
		}
		try {
			if (initialData && initialData.taskId) {
				await updateTask(initialData.taskId, task);
				alert('Tarea actualizada correctamente');
			} else {
				await createTask(task);
				alert('Tarea creada correctamente');
			}
			onClose();
		} catch (error) {
			console.error(error);
			alert('Error al guardar la tarea');
		}
	};

	if (!isOpen) return null;

	return (
		<Modal isOpen={isOpen} onClick={onClose} title="Formulario de Tarea">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
				<h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
					<FaListAlt /> {initialData ? 'Editar Tarea' : 'Nueva Tarea'}
				</h3>
				<label className="flex items-center gap-2">
					<FaRegEdit />
					<span className="w-24">Título</span>
					<input
						name="title"
						value={task.title}
						onChange={handleChange}
						placeholder="Título"
						required
						className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</label>
				<label className="flex items-center gap-2">
					<FaListAlt />
					<span className="w-24">Descripción</span>
					<textarea
						name="description"
						value={task.description}
						onChange={handleChange}
						placeholder="Descripción"
						className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</label>
				<div className="flex gap-4">
					<label className="flex items-center gap-2 w-1/2">
						<FaRegCalendarAlt />
						<span className="w-20">Inicio</span>
						<input
							name="startDate"
							type="date"
							value={task.startDate}
							onChange={handleChange}
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</label>
					<label className="flex items-center gap-2 w-1/2">
						<FaRegClock />
						<span className="w-20">Entrega</span>
						<input
							name="dueDate"
							type="date"
							value={task.dueDate}
							onChange={handleChange}
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</label>
				</div>
				<div className="flex gap-4">
					<label className="flex items-center gap-2 w-1/2">
						<FaFlag />
						<span className="w-20">Prioridad</span>
						<select
							name="priority"
							value={task.priority}
							onChange={handleChange}
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							<option value="Baja">Baja</option>
							<option value="Media">Media</option>
							<option value="Alta">Alta</option>
						</select>
					</label>
					<label className="flex items-center gap-2 w-1/2">
						<FaCheckCircle />
						<span className="w-20">Estado</span>
						<select
							name="status"
							value={task.status}
							onChange={handleChange}
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							<option value="Nuevo">Nuevo</option>
							<option value="En Proceso">En Proceso</option>
							<option value="Completado">Completado</option>
						</select>
					</label>
				</div>
				{/* colocar el progreso de la tarea si se está editando la tarea, hacerlo con barra de desplazamiento de porcentaje */}
				{initialData && (
					<label className="flex items-center gap-2">
						<FaRegClock />
						<span className="w-24">Progreso</span>
						{/* Barra de avance de 0 a 100 */}
						<input
							name="totalProgress"
							type="range"
							min="0"
							max="100"
							value={task.totalProgress}
							onChange={handleChange}
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						<span>{task.totalProgress}%</span>
					</label>
				)}
				{/* Botones de acción */}
				<div className="flex gap-4 mt-4">
					<button
						type="submit"
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					>
						<FaCheckCircle /> {initialData ? 'Actualizar' : 'Crear'}
					</button>
					<button
						type="button"
						onClick={onClose}
						className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
					>
						<FaTimes /> Cancelar
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
