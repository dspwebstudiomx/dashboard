import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import { useProjectTasks } from '@hooks/useProjectTasks';
import { FaUser, FaHeading, FaAlignLeft, FaCalendarAlt, FaFlag, FaPercent } from 'react-icons/fa';

const ProjectTaskForm = ({ isOpen, onClose, onSave, initialData, selectedClient }) => {
	const project = initialData?.project || {};

	useEffect(() => {
		if (isOpen && selectedClient) {
			console.log('Datos del cliente:', selectedClient);
		}
	}, [isOpen, selectedClient]);

	const clientFullName = selectedClient
		? `${selectedClient.fullName || ''} ${selectedClient.lastName || ''} ${
				selectedClient.lastName2 || ''
		  }`.trim()
		: '';

	const clientId = selectedClient?.id || '';

	const { createTask, updateTask } = useProjectTasks({
		selectedClient,
		project,
		isOpen,
	});

	const [task, setTask] = useState(
		initialData || {
			taskId: '',
			clientId: clientId,
			title: '',
			description: '',
			startDate: '',
			dueDate: '',
			priority: 'media',
			totalProgress: 0,
			status: 'Nuevo',
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleProgressChange = (e) => {
		setTask((prev) => ({
			...prev,
			totalProgress: Number(e.target.value),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedClient || !project.id) {
			alert('Faltan datos obligatorios: Cliente o Proyecto');
			return;
		}
		const taskWithProject = {
			...task,
			clientId: clientId,
			projectId: project.id,
		};
		try {
			if (task.taskId) {
				await updateTask(task.taskId, taskWithProject);
				alert('Tarea actualizada correctamente');
			} else {
				await createTask(taskWithProject);
				alert('Tarea creada correctamente');
			}
			onSave && onSave(taskWithProject);
			onClose();
		} catch (error) {
			console.error('Error al guardar la tarea:', error);
			alert('Error al guardar la tarea');
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClick={onClose}
			title={task.taskId ? 'Editar Tarea' : 'Agregar Tarea'}
			className="flex items-center justify-center"
		>
			<form onSubmit={handleSubmit} className="space-y-12 max-h-[70vh] text-base ">
				<input type="hidden" name="taskId" value={task.taskId} />

				{/* Cliente y Título en dos columnas */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Cliente */}
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaUser className="text-blue-500" />
							Cliente
						</span>
						<input
							type="text"
							name="clientFullName"
							value={clientFullName}
							readOnly
							disabled
							className="border-2 border-blue-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
						/>
						<input type="hidden" name="clientId" value={clientId} />
					</div>
					{/* Título */}
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaHeading className="text-blue-500" />
							Título
						</span>
						<input
							type="text"
							name="title"
							value={task.title}
							onChange={handleChange}
							required
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
				</div>

				{/* Fechas en dos columnas */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaCalendarAlt className="text-blue-500" />
							Fecha de inicio
						</span>
						<input
							type="date"
							name="startDate"
							value={task.startDate}
							onChange={handleChange}
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaCalendarAlt className="text-blue-500" />
							Fecha de entrega
						</span>
						<input
							type="date"
							name="dueDate"
							value={task.dueDate}
							onChange={handleChange}
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
				</div>

				{/* Prioridad y Progreso en dos columnas */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* Prioridad */}
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaFlag className="text-blue-500" />
							Prioridad
						</span>
						<select
							name="priority"
							value={task.priority}
							onChange={handleChange}
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							<option value="alta">Alta</option>
							<option value="media">Media</option>
							<option value="baja">Baja</option>
						</select>
					</div>

					{/* Estado de la tarea*/}
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaFlag className="text-blue-500" />
							Estado de la tarea
						</span>
						<select
							name="status"
							value={task.status || 'Nuevo'}
							onChange={handleChange}
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							<option value="Nuevo">Nuevo</option>
							<option value="En Progreso">En Progreso</option>
							<option value="Completado">Completado</option>
							<option value="Cancelado">Cancelado</option>
						</select>
					</div>
					{/* Progreso */}
					<div className="flex flex-col gap-8 font-medium text-gray-700">
						<span className="flex items-center gap-2">
							<FaPercent className="text-blue-500" />
							Progreso: <span className="font-semibold text-blue-600">{task.totalProgress}%</span>
						</span>
						<input
							type="range"
							name="progress"
							min="0"
							max="100"
							value={task.totalProgress}
							onChange={handleProgressChange}
							className="w-full accent-blue-500"
						/>
					</div>
				</div>

				{/* Descripción al final */}
				<div className="flex flex-col gap-8 font-medium text-gray-700">
					<span className="flex items-center gap-2">
						<FaAlignLeft className="text-blue-500" />
						Descripción
					</span>
					<textarea
						name="description"
						value={task.description}
						onChange={handleChange}
						className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-y-auto p-4 md:p-8"
						rows={15}
					/>
				</div>

				<div className="flex flex-col md:flex-row justify-center items-end gap-1 md:gap-4 p-2">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded shadow transition"
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
					>
						{task.taskId ? 'Actualizar tarea' : 'Agregar tarea'}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
