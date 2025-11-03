import React, { useState } from 'react';
import {
	MdKeyboardArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import Priority from '../Priority';
import TitleProjectCard from '@components/Texts/TitleProjectCard';
import ProjectCardDates from './ProjectCardDates';
import TotalCostProyectCard from '../TotalCostProyectCard';
import CloseProjectMessaje from './Card/CloseProjectMessaje';
import { useProjectDescription } from '@hooks/useProjectDescription';
import ProjectActionButtons from '../ProjectActionButtons';
import AdminActionButton from '../AdminActionButton';
import Button from '@components/Botones/Button';
import ProjectCardTaskSummary from '../ProjectCard/ProjectCardTaskSummary';

const ContentProjectCard = ({ project, actions, netPayable }) => {
	const [showFullDescriptionription, setshowFullDescriptionriptionription] = useState(false);
	const { isLong, short } = useProjectDescription(project.description);
	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 4;

	// Desestructuramos las acciones para usarlas fácilmente
	const { isCompleted, onEdit, onDelete, handleCompleteClick, openAdminModal } = actions;

	// Calcular tareas para la página actual
	const totalTasks = project.tasks || [];
	const totalPages = Math.ceil(totalTasks.length / tasksPerPage);
	const paginatedTasks = totalTasks.slice(
		(currentPage - 1) * tasksPerPage,
		currentPage * tasksPerPage
	);

	return (
		<article className="flex flex-col xl:flex-row gap-12 p-6 md:p-8 justify-between first-letter:uppercase">
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
						project={project} // Pasar el proyecto completo
						isLongDescription={isLong} // Indicar si la descripción es larga
						shortDescription={short} // Pasar la descripción corta
						showFullDescriptionription={showFullDescriptionription}
						setshowFullDescriptionription={setshowFullDescriptionriptionription}
					/>
				</div>

				<ProjectCardTaskSummary
					tasks={totalTasks} // Pasar las tareas completas
					totalPages={totalPages} // Pasar el total de páginas
					paginatedTasks={paginatedTasks} // Pasar las tareas paginadas
					setCurrentPage={setCurrentPage} // Función para actualizar la página actual
					project={project} // Pasar el proyecto completo para acceder a su prioridad
				/>
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

export default ContentProjectCard;
