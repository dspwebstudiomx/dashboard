import React from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({ selectedClient, project, isOpen }) => {
	const { tasks, handleCreateTask, handleDeleteTask, handleEditTaskClick } = useProjectTasks({
		selectedClient,
		project,
		isOpen,
	});

	console.log('Proyecto recibido:', project);
	console.log('Tareas del proyecto:', project?.tasks);
	console.log('Tareas del hook:', tasks);

	return (
		<ProjectTasksTable
			tasks={tasks}
			selectedClient={selectedClient}
			onCreateTask={handleCreateTask}
			onDeleteTask={handleDeleteTask}
			onEditTaskClick={handleEditTaskClick}
			// ...otros props necesarios...
		/>
	);
};

export default ProjectTasks;
