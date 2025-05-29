import Modal from '@components/Modal';
import React from 'react';
import Priority from '../Priority';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import GrayLine from '@components/Lineas/GrayLine';

import ServicesSectionsInfo from './AdminProjectModal/ServicesSectionsInfo';
import ProjectTasks from './AdminProjectModal/Tasks/ProjectTasks';

const GeneralProjectInfo = ({
	isOpen,
	onClose,
	project,
	showTaskModal,
	setShowTaskModal,
	taskTitle,
	setTaskTitle,
	taskDescription,
	setTaskDescription,
	successMessage,
	tasks,
	taskPriority,
	setTaskPriority,
	taskStatus,
	setTaskStatus,
	editTask,
	setEditTask,
	handleCreateTask,
	handleDeleteTask,
	handleEditTaskClick,
	handleEditTask,
	resetTaskForm,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClick={onClose}
			title={
				<div className="flex flex-col-reverse  sm:flex-row items-center justify-center gap-6">
					<h2 id="titulo-proyecto" className="md:text-3xl text-left md:text-center">
						{project.title}
					</h2>
					<div className="flex flex-col md:flex-row gap-4 items-center justify-center">
						<Priority project={project} />
					</div>
				</div>
			}
		>
			<div
				id="modal-content"
				className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-gray-100"
			>
				<div className="flex flex-col gap-6 py-12">
					<h2 className="text-2xl font-semibold">Descripción del Proyecto</h2>
					<span className="ml-4">
						<ProjectDescriptionInfoCard project={project} />
					</span>
				</div>

				<GrayLine />
				<ServicesSectionsInfo project={project} />

				<GrayLine />

				<ProjectTasks
					project={project}
					clientId={project?.clientId}
					actions={{
						showTaskModal,
						setShowTaskModal,
						taskTitle,
						setTaskTitle,
						taskDescription,
						setTaskDescription,
						successMessage,
						tasks,
						taskPriority,
						setTaskPriority,
						taskStatus,
						setTaskStatus,
						editTask,
						setEditTask,
						handleCreateTask,
						handleDeleteTask,
						handleEditTaskClick,
						handleEditTask,
						resetTaskForm,
					}}
				/>
			</div>
		</Modal>
	);
};

export default GeneralProjectInfo;
