import React from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({ selectedClient, clientId, project, isOpen }) => {
	const { tasks, createTask, updateTask, handleDeleteTask, handleEditTaskClick, handleSaveTask } =
		useProjectTasks({
			clientId,
			projectId: project?.id,
			isOpen,
		});

	// ...logs y depuración...

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
		/>
	);
};

export default ProjectTasks;
