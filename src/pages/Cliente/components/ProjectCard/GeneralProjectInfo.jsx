import Modal from '@components/Modal';
import React from 'react';
import Priority from '../Priority';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import GrayLine from '@components/Lineas/GrayLine';

import ServicesSectionsInfo from './AdminProjectModal/ServicesSectionsInfo';
import ProjectTasks from './AdminProjectModal/Tasks/ProjectTasks';
import Button from '@components/Botones/Button';
import { LuPencil } from 'react-icons/lu';
import { FaTrashAlt } from 'react-icons/fa';
import EditActionButton from '../EditActionButton';
import DeleteActionButton from '../DeleteActionButton';

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
	clientId,
	selectedClient,
	loadClientOrProjectData,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={
				<div className="flex flex-col md:flex-col-reverse lg:flex-row items-center justify-between gap-6">
					{/* Título y Prioridad */}
					<div className="flex flex-col md:flex-row items-left gap-8 w-full md:w-auto md:mb-12">
						{/* Título del proyecto */}
						<h2 id="titulo-proyecto" className="md:text-3xl text-left md:text-center ml-6">
							{project.title}
						</h2>
						{/* Prioridad del proyecto */}
						<div className="flex flex-col md:flex-row gap-4 items-center justify-center">
							<Priority project={project} />
						</div>
					</div>
					{/* Botones */}
					<div className="hidden  md:flex md:flex-row gap-4">
						<EditActionButton onClick={''} text="Editar Proyecto" />
						<DeleteActionButton onClick={''} />
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
					selectedClient={selectedClient}
					clientId={clientId}
					project={project}
					isOpen={isOpen}
					loadClientOrProjectData={loadClientOrProjectData}
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
						clientId,
					}}
				/>

				{/* Botones */}
				<div className="md:hidden flex flex-col md:flex-row gap-4 mt-12">
					<EditActionButton onClick={''} text="Editar Proyecto" />
					<DeleteActionButton onClick={''} />
				</div>
			</div>
		</Modal>
	);
};

export default GeneralProjectInfo;
