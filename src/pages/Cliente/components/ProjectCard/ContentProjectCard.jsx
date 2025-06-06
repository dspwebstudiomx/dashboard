import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import Priority from '../Priority';
import TitleProjectCard from '@components/Texts/TitleProjectCard';
import ProjectCardDates from './ProjectCardDates';
import TotalCostProyectCard from '../TotalCostProyectCard';
import CloseProjectMessaje from './CloseProjectMessaje';
import { useProjectDescription } from '@hooks/useProjectDescription';
import ProjectActionButtons from '../ProjectActionButtons';
import AdminActionButton from '../AdminActionButton';

const ContentProjectCard = ({ project, actions, totalConImpuestos }) => {
	const [showFullDesc, setShowFullDesc] = useState(false);
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
						showFullDesc={showFullDesc}
						setShowFullDesc={setShowFullDesc}
					/>
				</div>
				<div className="flex flex-col gap-6">
					{/* mostrar nombre Tareas generadas*/}
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
					<TotalCostProyectCard totalConImpuestos={totalConImpuestos} />
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
