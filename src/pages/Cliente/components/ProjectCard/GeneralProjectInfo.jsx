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
// import { SERVICE_COSTS, SECTION_COSTS } from '../../hooks/useProjects';
import ProjectActionButtons from '../ProjectActionButtons';
import { useProjectDescription } from '@hooks/useProjectDescription';

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

	onDelete,
}) => {
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
							<h2
								id="titulo-proyecto"
								className="md:text-3xl text-left ml-6 flex flex-col font-semibold text-gray-800 dark:text-white"
							>
								{project.title}
								<span className="text-base md:ml-3 text-gray-400">ID Proyecto: {project.id}</span>
							</h2>
							{/* Prioridad del proyecto */}
							<div className="flex flex-col md:flex-row gap-4 items-center justify-center">
								<Priority project={project} />
							</div>
						</div>
						{/* Botones */}
						<div className="flex gap-4 mt-12">
							<EditActionButton onClick={onDelete} text="Editar" />
							<DeleteActionButton onClick={onDelete} text="Eliminar" />
						</div>
					</div>
				}
			>
				<div
					id="modal-content"
					className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 md:p-10 shadow-lg dark:bg-gray-800 dark:text-gray-100 md:mr-10 max-w-screen-xl mx-auto"
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
		</>
	);
};

const ContentProjectCard = ({ project, actions, netPayable }) => {
	const [showFullDescription, setshowFullDescriptionription] = useState(false);
	const { isLong, short } = useProjectDescription(project.description);

	// Desestructuramos las acciones para usarlas fácilmente
	const { isCompleted, onEdit, onDelete, handleCompleteClick, openAdminModal } = actions;

	return (
		<article className="flex flex-col md:flex-row gap-12 p-6 md:p-8 justify-between first-letter:uppercase">
			{/* Contenido principal del proyecto */}
			<div className="flex flex-col gap-6 justify-between">
				<div className="flex flex-col gap-8 text-balance w-full ">
					{/* Título y prioridad */}
					<div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-12 md:gap-6">
						<TitleProjectCard project={project} />
						<div className="flex justify-end md:items-center gap-2">
							<Priority project={project} />
						</div>
					</div>

					<ProjectDescriptionInfoCard
						project={project}
						isLongDescription={isLong}
						shortDesc={short}
						showFullDescription={showFullDescription}
						setshowFullDescriptionription={setshowFullDescriptionription}
					/>
				</div>
				<div className="flex flex-col gap-6">
					{/* mostrar nombre Tareas generadas */}
					<div className="flex flex-col gap-4 first-letter:uppercase text-sm">
						<div className="flex gap-3 items-center">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
								Tareas generadas
							</h3>
							<p
								className={`text-gray-100 border rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold ${
									project.priority === 'Alta'
										? 'bg-red-400 border-red-500'
										: project.priority === 'Media'
										? 'bg-yellow-400 border-yellow-500'
										: 'bg-green-500 border-green-600'
								}`}
							>
								{project.tasks && project.tasks.length === 1
									? `1`
									: `${project.tasks ? project.tasks.length : 0}`}
							</p>
						</div>
						<p className="text-gray-700 dark:text-gray-200 first-letter:uppercase">
							{project.tasks && project.tasks.length > 0 ? (
								project.tasks.map((task, idx) => (
									<span key={task.id || idx} className="block text-pretty first-letter:uppercase">
										<MdKeyboardArrowRight
											className={`inline mr-1 ${
												task.priority === 'Alta'
													? 'text-red-500'
													: task.priority === 'Media'
													? 'text-yellow-500'
													: 'text-green-500'
											}`}
											size={24}
										/>
										{task.title || task.name || 'Sin descripción'}
									</span>
								))
							) : (
								<span>No hay tareas generadas</span>
							)}
						</p>
					</div>
				</div>
			</div>

			{/* Fechas y Botones de Acción */}
			<div className="text-lg md:text-base flex flex-col gap-8 justify-between h-full">
				{/* Fechas y total del proyecto */}
				<div className="flex flex-col gap-2 mt-4">
					<ProjectCardDates project={project} isCompleted={isCompleted} />
					<span className="h-4"></span>
					<TotalCostProyectCard netPayable={netPayable} />
				</div>

				{/* Botones de acción */}
				<div className="flex flex-col gap-4 mt-12">
					<ProjectActionButtons
						isCompleted={isCompleted}
						openAdminModal={openAdminModal}
						onEdit={onEdit}
						onDelete={onDelete}
						handleCompleteClick={handleCompleteClick}
					/>
					{isCompleted && (
						<div className="flex flex-col gap-4">
							<AdminActionButton onClick={openAdminModal} text="Ver Proyecto" />
							<CloseProjectMessaje />
						</div>
					)}
				</div>
			</div>
		</article>
	);
};

export default GeneralProjectInfo;
