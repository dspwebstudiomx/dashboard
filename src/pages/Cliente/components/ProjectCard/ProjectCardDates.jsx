import React from 'react';

const ProjectCardDates = ({ project, isCompleted }) => {
	return (
		<div className="flex flex-col gap-5 text-base">
			{/* Fecha de Inicio */}
			<p className="text-gray-800 dark:text-gray-100 flex flex-col gap-1">
				Fecha de inicio:
				<br />
				<span className="text-blue-900 dark:text-blue-400 font-semibold">
					{new Date(project.startDate).toLocaleDateString()}
				</span>
			</p>
			{/* Fecha de término */}
			<p className=" text-gray-800 dark:text-gray-100">
				Fecha de término:{' '}
				<span className="text-blue-900 dark:text-blue-400 font-semibold">
					{new Date(project.dueDate).toLocaleDateString()}
				</span>
			</p>
			{/* Días restantes */}
			<p className=" text-gray-700 dark:text-gray-100">
				Días restantes al día de hoy:
				<br />
				<span className="text-blue-900 dark:text-blue-400 font-semibold">
					{isCompleted
						? 'terminado'
						: Math.max(
								0,
								Math.ceil((new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
						  )}
					{' días'}
				</span>
			</p>
			{/* Duración del Proyecto */}
			<p className=" text-gray-700 dark:text-gray-100">
				Duración del Proyecto:
				<br />
				<span className="text-blue-900 dark:text-blue-400 font-semibold">
					{Math.ceil(
						(new Date(project.dueDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24)
					)}{' '}
					días
				</span>
			</p>
		</div>
	);
};

export default ProjectCardDates;
