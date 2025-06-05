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
				const updatedTask = {
					...task,
					updatedAt: new Date().toISOString(), // <-- Actualiza la fecha aquí
				};
				await updateTask(initialData.taskId, updatedTask);
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
				className="space-y-4 max-h-[70vh] text-base md:mt-20 p-4 md:p-0 pb-12 flex flex-col gap-8 md:mr-10"
			>
				<div className="flex flex-col md:flex-row gap-8 items-center justify-between">
					{/* Título de la tarea */}
					<label className="flex flex-col items-start gap-4">
						<div className="flex items-center gap-2">
							<FaRegEdit className="text-xl text-blue-600" />
							<span className=" font-semibold text-base">Título</span>
						</div>
						<input
							name="title"
							value={task.title}
							onChange={handleChange}
							placeholder="Título"
							required
							spellCheck={true} // Habilita revisión ortográfica
							className="w-120 flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</label>

					<div className="flex flex-col md:flex-row gap-8 items-start">
						{/* Fecha de inicio de la tarea */}
						<label className="flex flex-col items-start gap-4">
							<div className="flex items-center gap-2">
								<FaRegCalendarAlt className="text-xl text-blue-600" />
								<span className="font-semibold text-base">Fecha de Inicio</span>
							</div>
							<input
								name="startDate"
								type="date"
								value={task.startDate}
								onChange={handleChange}
								className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</label>

						{/* Fecha de Entrega */}
						<label className="flex flex-col items-start gap-4">
							<div className="flex items-center gap-2">
								<FaRegClock className="text-xl text-blue-600" />
								<span className="font-semibold text-base">Fecha de Entrega</span>
							</div>
							<input
								name="dueDate"
								type="date"
								value={task.dueDate}
								onChange={handleChange}
								className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</label>

						{/* Prioridad de la tarea */}
						<label className="flex flex-col items-start gap-4">
							<div className="flex items-center gap-2">
								<FaFlag className="text-xl text-blue-600" />
								<span className="font-semibold text-base">Prioridad</span>
							</div>
							<select
								name="priority"
								value={task.priority}
								onChange={handleChange}
								className="w-60 flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							>
								<option value="Baja">Baja</option>
								<option value="Media">Media</option>
								<option value="Alta">Alta</option>
							</select>
						</label>
					</div>
				</div>

				{/* Descripción de la tarea */}
				<label className="flex flex-col w-full items-start gap-4">
					<div className="flex items-center gap-2">
						<FaListAlt className="text-xl text-blue-600" />
						<span className="w-24 font-semibold text-base">Descripción</span>
					</div>
					<textarea
						rows={8}
						name="description"
						value={task.description}
						onChange={handleChange}
						placeholder="Descripción"
						spellCheck={true}
						className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full "
					/>
				</label>

				<div className="flex flex-col md:flex-row gap-12 items-end w-full justify-between">
					<div className="flex flex-col md:flex-row gap-8 w-full md:w-1/2">
						{/* Estado de la tarea */}
						<label className="flex flex-col items-start gap-4">
							<div className="flex items-center gap-2">
								<FaCheckCircle className="text-xl text-blue-600" />
								<span className="font-semibold text-base">Estado de la tarea</span>
							</div>
							<select
								name="status"
								value={task.status}
								onChange={handleChange}
								className="w-60 flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
							>
								<option value="Nuevo">Nuevo</option>
								<option value="En Proceso">En Proceso</option>
								<option value="Completado">Completado</option>
							</select>
						</label>

						{/* Progreso de la tarea */}
						{initialData && (
							<label className="flex flex-col items-start gap-4">
								<div className="flex items-center gap-2 w-full">
									<FaRegClock className="text-xl text-blue-600" />
									<span className="font-semibold text-base">Progreso</span>
								</div>
								<div className="flex items-center gap-6 w-[430px]">
									<input
										name="totalProgress"
										type="range"
										min="0"
										max="100"
										value={task.totalProgress}
										onChange={handleChange}
										className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
									/>
									<span>{task.totalProgress}%</span>
								</div>
							</label>
						)}

						{initialData && initialData.updatedAt && (
							<label className="flex flex-col md:flex-row items-start md:items-center gap-4">
								<div className="flex items-center gap-2">
									<FaRegCalendarAlt className="text-xl text-blue-600" />
									<span className="w-24 font-semibold text-base">Actualizado</span>
								</div>
								<input
									type="text"
									value={new Date(initialData.updatedAt).toLocaleString()}
									readOnly
									className="flex-1 border rounded px-3 py-2 bg-gray-100 text-gray-600 w-full md:w-auto"
								/>
							</label>
						)}
					</div>
					{/* Botones de acción */}
					<div className="flex flex-row justify-center items-end gap-4 md:gap-4 p-2">
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
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
