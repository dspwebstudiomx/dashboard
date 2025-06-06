import React, { useState } from 'react';
import { useProjectTasks } from '../../../../../hooks/useProjectTasks';
import GeneralProjectInfo from '../GeneralProjectInfo';

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project, clientId, selectedClient }) => {
	const {
		showTaskModal,
		setShowTaskModal,
		successMessage,
		tasks,
		handleDeleteTask,
		handleEditTaskClick,
		handleEditTask,
		editProject,
		setEditProject,
		handleEditProject,
		handleCompleteClick, // Desestructuración de handleCompleteClick
	} = useProjectTasks({ clientId, project, isOpen });

	const [showForm, setShowForm] = useState(false);
	const [editProjectId, setEditProjectId] = useState(null);

	// Definir openAdminModal
	const openAdminModal = () => {
		setShowForm(true); // Ejemplo: abre el formulario
	};

	return (
		<>
			<GeneralProjectInfo
				isOpen={isOpen}
				onClose={onClose}
				project={project}
				successMessage={successMessage}
				handleEditProject={handleEditProject}
				editProject={editProject}
				setEditProject={setEditProject}
				editProjectId={editProjectId}
				setEditProjectId={setEditProjectId}
				setShowTaskModal={setShowTaskModal}
				showTaskModal={showTaskModal}
				tasks={tasks}
				handleEditTaskClick={handleEditTaskClick}
				handleDeleteTask={handleDeleteTask}
				handleEditTask={handleEditTask}
				selectedClient={selectedClient}
				clientId={clientId}
				showForm={showForm}
				setShowForm={setShowForm}
				openAdminModal={openAdminModal} // Prop agregada
				isCompleted={project.isCompleted} // Prop agregada
				handleCompleteClick={handleCompleteClick} // Prop agregada
			/>
		</>
	);
};

export default AdminProjectModal;
