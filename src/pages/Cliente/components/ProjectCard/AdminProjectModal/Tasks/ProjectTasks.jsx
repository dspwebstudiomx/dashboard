import React from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({
	selectedClient,
	clientId,
	project,
	isOpen,
	loadClientOrProjectData = () => {}, // valor por defecto: función vacía
}) => {
	const { tasks, createTask, updateTask, handleDeleteTask, handleEditTaskClick, handleSaveTask } =
		useProjectTasks({
			clientId,
			projectId: project?.id,
			isOpen,
		});

	return (
		<ProjectTasksTable
			tasks={tasks}
			clientId={clientId}
			project={project}
			createTask={createTask}
			updateTask={updateTask}
			handleDeleteTask={handleDeleteTask}
			handleEditTaskClick={handleEditTaskClick}
			handleSaveTask={handleSaveTask}
			selectedClient={selectedClient}
			onTaskDeleted={loadClientOrProjectData}
			onTasksChanged={loadClientOrProjectData} // Esta función debe recargar el proyecto y sus tareas
		/>
	);
};

export default ProjectTasks;
