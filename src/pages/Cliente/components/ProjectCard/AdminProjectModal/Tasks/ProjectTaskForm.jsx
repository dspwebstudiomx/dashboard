import React, { useState } from 'react';
import Modal from '@components/Modal';
import { useProjectTasks } from '@hooks/useProjectTasks';
import { FaUser, FaHeading, FaAlignLeft, FaCalendarAlt, FaFlag, FaPercent } from 'react-icons/fa';

// El formulario debe de trabajar para editar o crear tarea
const ProjectTaskForm = ({ isOpen, onClose, onSave, initialData }) => {
	const { createTask, updateTask } = useProjectTasks();

	const [form, setForm] = useState(
		initialData || {
			taskId: '',
			clientId: '',
			title: '',
			description: '',
			startDate: '',
			dueDate: '',
			priority: 'media',
			progress: 0,
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleProgressChange = (e) => {
		setForm((prev) => ({
			...prev,
			progress: Number(e.target.value),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.taskId) {
			updateTask(form);
		} else {
			createTask(form);
		}
		onSave && onSave(form);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				<input type="hidden" name="taskId" value={form.taskId} />
				<label>
					<FaUser style={{ marginRight: 8 }} />
					Cliente ID
					<input
						type="text"
						name="clientId"
						value={form.clientId}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					<FaHeading style={{ marginRight: 8 }} />
					Título
					<input type="text" name="title" value={form.title} onChange={handleChange} required />
				</label>
				<label>
					<FaAlignLeft style={{ marginRight: 8 }} />
					Descripción
					<textarea name="description" value={form.description} onChange={handleChange} />
				</label>
				<label>
					<FaCalendarAlt style={{ marginRight: 8 }} />
					Fecha de inicio
					<input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
				</label>
				<label>
					<FaCalendarAlt style={{ marginRight: 8 }} />
					Fecha de entrega
					<input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
				</label>
				<label>
					<FaFlag style={{ marginRight: 8 }} />
					Prioridad
					<select name="priority" value={form.priority} onChange={handleChange}>
						<option value="alta">Alta</option>
						<option value="media">Media</option>
						<option value="baja">Baja</option>
					</select>
				</label>
				<label>
					<FaPercent style={{ marginRight: 8 }} />
					Progreso: {form.progress}%
					<input
						type="range"
						name="progress"
						min="0"
						max="100"
						value={form.progress}
						onChange={handleProgressChange}
					/>
				</label>
				<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
					<button type="submit">{form.taskId ? 'Actualizar' : 'Crear'}</button>
					<button type="button" onClick={onClose}>
						Cancelar
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProjectTaskForm;
