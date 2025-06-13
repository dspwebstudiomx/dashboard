import React, { createContext, useContext } from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';

const ProjectTasksContext = createContext();

export const ProjectTasksProvider = ({ clientId, projectId, isOpen, children }) => {
	const { tasks, createTask, updateTask, handleDeleteTask, handleEditTaskClick, handleSaveTask } =
		useProjectTasks({ clientId, projectId, isOpen });

	return (
		<ProjectTasksContext.Provider
			value={{
				tasks,
				createTask,
				updateTask,
				handleDeleteTask,
				handleEditTaskClick,
				handleSaveTask,
			}}
		>
			{children}
		</ProjectTasksContext.Provider>
	);
};

export const useProjectTasksContext = () => {
	const context = useContext(ProjectTasksContext);
	if (!context) {
		throw new Error('useProjectTasksContext debe usarse dentro de un ProjectTasksProvider');
	}
	return context;
};
