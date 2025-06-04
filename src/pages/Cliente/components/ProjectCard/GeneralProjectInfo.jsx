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
import ProjectActionButtons from '../ProjectActionButtons';

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
	showForm: showFormProp,
	setShowForm: setShowFormProp,
	editProjectId: editProjectIdProp,
	setEditProjectId: setEditProjectIdProp,
	newProject,
	setNewProject,
	onDelete,
	handleEditProject,
	editProjectId,
}) => {
	const [editProjectState, setEditProjectState] = useState(null);
	const [showForm, setShowForm] = useState(false);

	// Si recibes los estados como props, usa los props, si no, usa los locales
	const effectiveShowForm = typeof showFormProp === 'boolean' ? showFormProp : showForm;
	const effectiveSetShowForm = setShowFormProp || setShowForm;
	const effectiveEditProjectId =
		typeof editProjectIdProp !== 'undefined' ? editProjectIdProp : editProjectId;
	const effectiveSetEditProjectId = setEditProjectIdProp || effectiveSetEditProjectId;

	const handleEditProjectLocal = () => {
		effectiveSetEditProjectId(project.id);
		setEditProjectState({ ...project }); // Copia los datos actuales del proyecto
		effectiveSetShowForm(true);
	};

	const handleProjectSubmit = async (e) => {
		e.preventDefault();
		if (effectiveEditProjectId) {
			if (typeof handleEditProject === 'function') {
				// Llama a la función que actualiza el proyecto en el backend
				await handleEditProject(e);
			} else {
				console.error('handleEditProject no está definido o no es una función');
			}
			effectiveSetShowForm(false);
			effectiveSetEditProjectId(null);
			setEditProjectState(null);
		} else {
			effectiveSetShowForm(false);
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
						<div className="flex gap-4 mt-12">
							<EditActionButton onClick={handleEditProjectLocal} text="Editar Proyecto" />
							<DeleteActionButton onClick={onDelete} text="Eliminar Proyecto" />
						</div>
					</div>
				}
			>
				<div
					id="modal-content"
					className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 md:p-10 shadow-lg dark:bg-gray-800 dark:text-gray-100 md:mr-10"
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
				</div>
			</Modal>

			{/* Modal para editar proyecto */}
			{(effectiveShowForm || effectiveEditProjectId) &&
				(!effectiveEditProjectId || (effectiveEditProjectId && editProjectState)) && (
					<Modal
						title={effectiveEditProjectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
						onClose={() => {
							effectiveSetShowForm(false);
							effectiveSetEditProjectId(null);
							setEditProjectState(null);
						}}
						isOpen={!!effectiveShowForm || !!effectiveEditProjectId}
					>
						<ProjectForm
							project={effectiveEditProjectId ? editProjectState : newProject}
							isEdit={!!effectiveEditProjectId}
							setProject={effectiveEditProjectId ? setEditProjectState : setNewProject}
							onSubmit={handleProjectSubmit}
							onChange={(e) => {
								const { name, value } = e.target;
								if (effectiveEditProjectId) {
									setEditProjectState((prev) => ({ ...prev, [name]: value }));
								} else {
									setNewProject((prev) => ({ ...prev, [name]: value }));
								}
							}}
							SERVICE_COSTS={SERVICE_COSTS}
							SECTION_COSTS={SECTION_COSTS}
							clientId={clientId}
							selectedClient={selectedClient}
							successMessage={successMessage}
							loadClientOrProjectData={loadClientOrProjectData}
							tasks={tasks}
							resetTaskForm={resetTaskForm}
							handleCreateTask={handleCreateTask}
							handleDeleteTask={handleDeleteTask}
							handleEditTask={handleEditTask}
							handleEditTaskClick={handleEditTaskClick}
							taskTitle={taskTitle}
							setTaskTitle={setTaskTitle}
							taskDescription={taskDescription}
							setTaskDescription={setTaskDescription}
							taskPriority={taskPriority}
							setTaskPriority={setTaskPriority}
							taskStatus={taskStatus}
							setTaskStatus={setTaskStatus}
							editTask={editTask}
							setEditTask={setEditTask}
							showTaskModal={showTaskModal}
							setShowTaskModal={setShowTaskModal}
						/>
					</Modal>
				)}
		</>
	);
};

export default GeneralProjectInfo;
