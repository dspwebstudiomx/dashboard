import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import { useProjectTasks } from '@hooks/useProjectTasks';
import {
	FaUser,
	FaAlignLeft,
	FaCalendarAlt,
	FaFlag,
	FaPercent,
	FaProjectDiagram,
} from 'react-icons/fa';
import { FaTable } from 'react-icons/fa6';
import { CiDatabase } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';

const ProjectTaskForm = ({
	isOpen,
	onClose,
	onSave,
	initialData,
	selectedClient,
	clientId,
	project,
}) => {
	// const project = initialData?.project || {};

	// Obtener los datos del cliente y proyecto desde el hook
	const { project: projectData } = useProjectTasks({
		selectedClient,
		isOpen,
	});
	// Despliego los datos del cliente y proyecto
	useEffect(() => {
		if (projectData) {
			console.log('Datos del proyecto:', projectData);
		}
	}, [projectData]);

	const { createTask, updateTask } = useProjectTasks({
		selectedClient,
		isOpen,
	});

	const realClientId = clientId || initialData?.clientId || selectedClient?.clientId || '';

	const [task, setTask] = useState(
		initialData || {
			taskId: Date.now(),
			clientId: realClientId,
			title: '',
			description: '',
			startDate: '',
			dueDate: '',
			priority: 'Baja',
			totalProgress: 0,
			status: 'Nuevo',
		}
	);
	console.log('Datos de la tarea:', task);
	console.log('ID del cliente:', realClientId);

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
		if (!selectedClient || !projectToShow?.id) {
			alert('Faltan datos obligatorios: Cliente o Proyecto');
			return;
		}
		const isNew = !task.taskId;
		const taskWithProject = {
			...task,
			taskId: isNew ? Date.now() : task.taskId,
			selectedClient: projectToShow.client,
			clientId: realClientId,
			projectId: projectToShow.id,
			priority: task.priority || 'Baja',
			status: task.status || 'Nuevo',
		};
		try {
			if (!isNew) {
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

	// Usar el proyecto disponible (prop o hook)
	const projectToShow = project && project.id && project.title ? project : projectData;

	// Determinar si es edición o creación
	const isEdit = Boolean(initialData && initialData.taskId);

	if (!projectToShow || !projectToShow.title) {
		return <div>Cargando proyecto...</div>;
	}

	return (
		<Modal
			isOpen={isOpen}
			onClick={onClose}
			title={isEdit ? 'Editar Tarea' : 'Agregar Tarea'}
			className="flex items-center justify-center"
		>
			{/* Encabezado con icono y título */}
			<div className="flex flex-col md:flex-row gap-12 font-medium text-gray-700 sticky top-0 bg-white dark:bg-gray-800 p-4 pb-8 w-full border-b border-blue-200">
				{/* ID de la tarea */}
				<div className="flex items-center gap-2">
					{/* react icon */}
					<CiDatabase className="text-blue-600 text-4xl" size={32} />
					<p className="">
						ID de la tarea: <span className="font-semibold">{task.taskId || 'Nueva Tarea'}</span>
					</p>
					{/* <input type="text" name="projectId" value={project.task.id} /> */}
				</div>
				{/* Cliente */}
				<div className="flex items-center gap-2">
					<IoPersonOutline className="text-blue-600 text-4xl" size={32} />
					<p className="">
						Cliente: <span className="font-semibold">{clientId || 'No definido'}</span>
					</p>
				</div>
				<div className="flex items-center gap-2 font-medium text-gray-700">
					<FaProjectDiagram className="text-blue-600 text-4xl" size={32} />
					<p className="">
						Proyecto: <span className="font-semibold">{projectToShow?.title || 'No definido'}</span>
					</p>
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className="space-y-12 max-h-[70vh] text-base text-gray-700 dark:text-gray-100 p-8"
			>
				{/* <GrayLine /> */}

				{/* Título en dos columnas */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Título */}
					<div className="flex flex-col gap-8 font-medium">
						<span className="flex items-center gap-2">
							<FaTable className="text-blue-500" />
							Título de la tarea
						</span>
						<input
							type="text"
							name="title"
							value={task.title}
							onChange={handleChange}
							required
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
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
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
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
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
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
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
						>
							{' '}
							<option value="Baja">Baja</option>
							<option value="Media">Media</option>
							<option value="Alta">Alta</option>
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
							className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
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
							className="w-full accent-blue-500 border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100"
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
						className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-100 resize-none overflow-y-auto p-4 md:p-8"
						rows={15}
					/>
				</div>

				{/* tabla con historial de actualizaciones de la tarea */}
				<div className="flex flex-col gap-8 font-medium text-gray-700">
					<span className="flex items-center gap-2">
						<FaUser className="text-blue-500" />
						Historial de Actualizaciones
					</span>
					<table className="min-w-full bg-white border border-gray-200 text-base">
						<thead>
							<tr>
								<th className="border px-4 py-2">Fecha</th>
								<th className="border px-4 py-2">Descripción</th>
							</tr>
						</thead>
						<tbody>
							{task.history && task.history.length > 0 ? (
								task.history.map((update, index) => (
									<tr key={index}>
										<td className="border px-4 py-2">
											{new Date(update.date).toLocaleDateString()}
										</td>
										<td className="border px-4 py-2">{update.description}</td>
									</tr>
								))
							) : (
								<tr className="border">
									<td colSpan={2} className="text-center py-4">
										No hay actualizaciones.
									</td>
								</tr>
							)}
						</tbody>
					</table>
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
						{isEdit ? 'Actualizar tarea' : 'Agregar tarea'}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
