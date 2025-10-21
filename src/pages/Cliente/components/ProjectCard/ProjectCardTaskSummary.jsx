import React, { useState } from 'react';
import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
	MdKeyboardArrowRight,
} from 'react-icons/md';
import Button from '@components/Botones/Button';

const ProjectCardTaskSummary = ({ project = {} }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 4;

	// `actions` puede contener manejadores, no se usan aquí pero se mantienen disponibles
	// si en el futuro se necesita pasar alguno, se accederá desde `actions`.

	// Calcular tareas para la página actual
	const totalTasks = project.tasks || [];
	const totalPages = Math.ceil(totalTasks.length / tasksPerPage);
	const paginatedTasks = totalTasks.slice(
		(currentPage - 1) * tasksPerPage,
		currentPage * tasksPerPage
	);
	return (
		<div className="flex flex-col justify-end gap-4 first-letter:uppercase text-sm h-64 overflow-y-auto">
			<div className="flex gap-3 items-center">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tareas generadas</h3>
				<p
					className={`text-gray-100 border rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold ${
						project.priority === 'Alta'
							? 'bg-red-400 border-red-500'
							: project.priority === 'Media'
							? 'bg-yellow-400 border-yellow-500'
							: 'bg-green-500 border-green-600'
					}`}
				>
					{totalTasks.length}
				</p>
			</div>
			<p className="text-gray-700 dark:text-gray-200 first-letter:uppercase text-base">
				{paginatedTasks.length > 0 ? (
					paginatedTasks
						.sort((a, b) => (a.status === 'Completado' ? 1 : b.status === 'Completado' ? -1 : 0)) // Ordena las tareas, colocando las completadas al final
						.map((task, idx) => (
							<span
								key={task.id || idx}
								className={`block text-pretty first-letter:uppercase ${
									task.status === 'Completado' ? 'line-through text-gray-500' : ''
								}`}
							>
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
								{task.title || task.name || 'Sin descripción'} -
								<span className="text-sm text-gray-600 dark:text-gray-400 ml-4 font-semibold">
									{task.totalProgress}%
								</span>
							</span>
						))
				) : (
					<span>No hay tareas generadas</span>
				)}
			</p>
			{/* Paginación */}
			{totalPages > 1 && (
				<div className="flex gap-2 mt-4">
					{currentPage > 1 && (
						<Button
							onClick={() => setCurrentPage((prev) => prev - 1)}
							text="Anterior"
							icon={MdKeyboardDoubleArrowLeft}
							size="sm"
						/>
					)}
					{currentPage < totalPages && (
						<Button
							onClick={() => setCurrentPage((prev) => prev + 1)}
							icon={MdKeyboardDoubleArrowRight}
							text="Siguiente"
							size="sm"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default ProjectCardTaskSummary;
