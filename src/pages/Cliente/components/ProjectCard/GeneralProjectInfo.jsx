import React, { useState } from 'react';
import Modal from '@components/Modal';
import Priority from '../Priority';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import GrayLine from '@components/Lineas/GrayLine';
import ServicesSectionsInfo from './AdminProjectModal/ServicesSectionsInfo';
import ProjectTasks from './AdminProjectModal/Tasks/ProjectTasks';
import EditActionButton from '../EditActionButton';
import DeleteActionButton from '../DeleteActionButton';
import ProjectForm from '../ProjectForm';
import { SERVICE_COSTS, SECTION_COSTS } from '../../hooks/useProjects';

class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <div>Ocurrió un error al mostrar el formulario.</div>;
		}
		return this.props.children;
	}
}

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
	showForm,
	setShowForm,
	editProjectId,
	setEditProjectId,
	newProject,
	setNewProject,
}) => {
	const [editProject, setEditProject] = useState(null);

	const handleProjectSubmit = async (e) => {
		e.preventDefault();
		if (editProjectId) {
			// Aquí deberías guardar editProject en tu backend o estado global
			if (typeof loadClientOrProjectData === 'function') {
				await loadClientOrProjectData();
			}
			setShowForm(false);
			setEditProjectId(null);
		} else {
			setShowForm(false);
		}
	};

	return (
		<>
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
							<EditActionButton
								onClick={() => {
									setEditProject({
										...project,
										services: Array.isArray(project.services)
											? project.services.map((s) => ({
													...(typeof s === 'string' ? { name: s } : s),
													cost:
														typeof s === 'string'
															? SERVICE_COSTS[s] ?? 0
															: s.cost ?? SERVICE_COSTS[s.name] ?? 0,
											  }))
											: [],
										sections: Array.isArray(project.sections)
											? project.sections.map((sec) => ({
													...(typeof sec === 'string' ? { name: sec } : sec),
													cost:
														typeof sec === 'string'
															? SECTION_COSTS[sec] ?? 0
															: sec.cost ?? SECTION_COSTS[sec.name] ?? 0,
											  }))
											: [],
									});
									setEditProjectId(project.id);
									setShowForm(true);
								}}
								text="Editar Proyecto"
							/>
							<DeleteActionButton onClick={() => {}} />
						</div>
					</div>
				}
			>
				<div
					id="modal-content"
					className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-gray-100 md:mr-10"
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
						<EditActionButton onClick={() => setShowForm(true)} text="Editar Proyecto" />
						<DeleteActionButton onClick={() => {}} />
					</div>
				</div>
			</Modal>

			{/* Modal para editar proyecto */}
			{(showForm || editProjectId) && (
				<Modal
					title={editProjectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
					onClose={() => {
						setShowForm(false);
						setEditProjectId(null);
					}}
					isOpen={!!showForm || !!editProjectId}
				>
					<ProjectForm
						project={editProjectId ? editProject : newProject}
						isEdit={!!editProjectId}
						setProject={editProjectId ? setEditProject : setNewProject}
						onSubmit={handleProjectSubmit}
						// ...el resto de props igual
					/>
				</Modal>
			)}
		</>
	);
};

export default GeneralProjectInfo;
