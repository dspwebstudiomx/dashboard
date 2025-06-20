import React, { useState } from 'react';
import { useClientContext } from '../@context/ClientContext';

const ProjectTaskForm = ({ onSubmit, openModal, taskId }) => {
	const { selectedClient } = useClientContext();
	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const isEditing = Boolean(taskId);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedClient) {
			alert('No hay un cliente seleccionado.');
			return;
		}

		const newTask = {
			clientId: selectedClient.id,
			name: taskName,
			description: taskDescription,
		};

		onSubmit(newTask);
		setTaskName('');
		setTaskDescription('');
	};

	if (taskId) {
		openModal('update', taskId);
	} else {
		openModal('create');
	}

	const modalTitle = isEditing ? 'Actualizar Tarea' : 'Crear Tarea';

	return (
		<form onSubmit={handleSubmit}>
			<h3>
				{modalTitle} para {selectedClient?.fullName || 'Cliente'}
			</h3>
			<div>
				<label htmlFor="taskName">Nombre de la Tarea:</label>
				<input
					id="taskName"
					type="text"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="taskDescription">Descripción:</label>
				<textarea
					id="taskDescription"
					value={taskDescription}
					onChange={(e) => setTaskDescription(e.target.value)}
					required
				/>
			</div>
			<button type="submit">{isEditing ? 'Actualizar' : 'Agregar'} Tarea</button>
		</form>
	);
};

export default ProjectTaskForm;
