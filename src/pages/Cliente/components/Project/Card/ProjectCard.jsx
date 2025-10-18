import React, { useMemo } from 'react';
import ContentProjectCard from '../ContentProjectCard';
import LinePriorityCard from '../../LinePriority';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { FinancialCalculate } from '../../../data/FinancialCalculate';
import GeneralProjectInfo from '../../GeneralProjectInfo/GeneralProjectInfo';

const ProjectCard = ({
	project,
	clientId,
	handleComplete,
	SERVICE_COSTS,
	SECTION_COSTS,
	onEdit,
	onDelete,
}) => {
	// Preferir el netPayable calculado y guardado en el proyecto (si existe). Si no, calcularlo.
	const memoCalc = useMemo(
		() => FinancialCalculate(project, SERVICE_COSTS, SECTION_COSTS),
		[project, SERVICE_COSTS, SECTION_COSTS]
	);
	const netPayable = project?.costs?.netPayable ?? memoCalc.netPayable;

	// Usar el custom hook
	const { isCompleted, generalProjectinfo, closeModal, openModal, handleCompleteClick } =
		useProjectCard(project, handleComplete);

	// Agrupar acciones relacionadas
	const actions = {
		isCompleted,
		onEdit,
		onDelete,
		handleCompleteClick,
		openAdminModal: openModal,
	};

	return (
		<li
			id={`Proyecto-${project.title}`}
			className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden h-auto"
		>
			{/* Línea de tarjeta */}
			<LinePriorityCard project={project} />

			{/* Contenido de la tarjeta */}
			<ContentProjectCard project={project} actions={actions} netPayable={netPayable} />

			{/* Modal de administración */}
			<GeneralProjectInfo
				isOpen={generalProjectinfo}
				onClose={closeModal}
				project={project}
				clientId={clientId}
				onEdit={() => onEdit && onEdit(project)}
				onDelete={() => onDelete && onDelete(project.id)}
			/>
		</li>
	);
};

export default ProjectCard;
