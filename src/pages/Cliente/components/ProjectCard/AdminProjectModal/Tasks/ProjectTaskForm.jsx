import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import Button from '@components/Botones/Button';
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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={initialData ? 'Actualizar Tarea' : 'Crear Nueva Tarea'}
			className="flex items-center justify-center"
		>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 max-h-[70vh] text-base mt-20 overflow-y-auto"
			>
				<label className="flex items-center gap-2">
					<FaRegEdit className="text-xl text-blue-600" />
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
					<FaListAlt className="text-xl text-blue-600" />
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
						<FaRegCalendarAlt className="text-xl text-blue-600" />
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
						<FaRegClock className="text-xl text-blue-600" />
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
						<FaFlag className="text-xl text-blue-600" />
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
						<FaCheckCircle className="text-xl text-blue-600" />
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
				{initialData && (
					<label className="flex items-center gap-2">
						<FaRegClock className="text-xl text-blue-600" />
						<span className="w-24">Progreso</span>
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
				<div className="flex flex-col md:flex-row justify-center items-end gap-1 md:gap-4 p-2">
					<Button
						variant="secondary"
						type="button"
						onClick={onClose}
						text="Cancelar"
						icon={FaTimes}
					/>
					<Button
						variant="primary"
						type="submit"
						text={initialData ? 'Actualizar' : 'Crear'}
						icon={FaCheckCircle}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
