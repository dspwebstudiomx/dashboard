import React, { useState } from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({
	selectedClient,
	clientId,
	project: initialProject,
	isOpen,
	loadClientOrProjectData = () => {}, // valor por defecto: función vacía
}) => {
	const [project, setProject] = useState(initialProject); // Define el estado del proyecto

	const { tasks, createTask, updateTask, handleDeleteTask, handleEditTaskClick, handleSaveTask } =
		useProjectTasks({
			clientId,
			projectId: project?.id,
			isOpen,
		});

	const handleTasksChanged = (updatedTasks) => {
		setProject((prevProject) => ({
			...prevProject,
			tasks: updatedTasks,
		}));
	};

	return (
		<ProjectTasksTable
			tasks={tasks}
			clientId={clientId}
			project={project}
			projectId={project?.id}
			createTask={createTask}
			updateTask={updateTask}
			handleDeleteTask={handleDeleteTask}
			handleEditTaskClick={handleEditTaskClick}
			handleSaveTask={handleSaveTask}
			selectedClient={selectedClient}
			onTaskDeleted={loadClientOrProjectData}
			onTasksChanged={handleTasksChanged} // Esta función debe recargar el proyecto y sus tareas
		/>
	);
};

export default ProjectTasks;
