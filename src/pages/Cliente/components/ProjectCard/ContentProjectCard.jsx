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
import CloseProjectMessaje from './CloseProjectMessaje';
import { useProjectDescription } from '@hooks/useProjectDescription';
import ProjectActionButtons from '../ProjectActionButtons';
import AdminActionButton from '../AdminActionButton';
import Button from '@components/Botones/Button';
import ProjectCardTaskSummary from './ProjectCardTaskSummary';
import ServicesProjectTag from '../ServicesProjectTag';
import SectionsProjectTag from '../SectionsProjectTag';

const ContentProjectCard = ({ project, actions, netPayable }) => {
	const [showFullDescriptionription, setshowFullDescriptionription] = useState(false);
	const { isLong, short } = useProjectDescription(project.description);

	// Protegemos por si no se pasan acciones desde el padre
	const { isCompleted, onEdit, onDelete, handleCompleteClick, openAdminModal } = actions || {};

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
						project={project}
						isLongDescription={isLong}
						shorrDescription={short}
						showFullDescriptionription={showFullDescriptionription}
						setshowFullDescriptionription={setshowFullDescriptionription}
					/>
				</div>

				<div className="mt-12">
					<h3 className="text-xl">Servicios del Proyecto</h3>
					<ServicesProjectTag project={project} />
				</div>
				<div className="mt-6">
					<h3 className="text-xl">Secciones del Proyecto</h3>
					<SectionsProjectTag project={project} />
				</div>
				<div className="flex flex-col gap-6">
					<ProjectCardTaskSummary project={project} />
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

export default ContentProjectCard;
