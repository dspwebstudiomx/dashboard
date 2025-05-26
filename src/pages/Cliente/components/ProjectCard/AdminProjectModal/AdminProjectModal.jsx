import React from 'react';
import { useProjectTasks } from './Tasks/useProjectTasks';
import GeneralProjectInfo from '../GeneralProjectInfo';

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project, clientId }) => {
	const {
		showTaskModal,
		setShowTaskModal,
		successMessage,
		tasks,
		handleDeleteTask,
		handleEditTaskClick,
		handleEditTask,
	} = useProjectTasks({ clientId, project, isOpen });

	return (
		<>
			<GeneralProjectInfo
				isOpen={isOpen}
				onClose={onClose}
				project={project}
				successMessage={successMessage}
				setShowTaskModal={setShowTaskModal}
				showTaskModal={showTaskModal}
				tasks={tasks}
				handleEditTaskClick={handleEditTaskClick}
				handleDeleteTask={handleDeleteTask}
				handleEditTask={handleEditTask}
			/>
		</>
	);
};

export default AdminProjectModal;
