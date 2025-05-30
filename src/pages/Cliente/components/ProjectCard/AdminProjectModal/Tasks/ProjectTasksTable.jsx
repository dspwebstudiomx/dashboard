import React, { useState } from 'react';
import Button from '@components/Botones/Button';
import ProjectTaskForm from './ProjectTaskForm';
import { FaPlus } from 'react-icons/fa6';

const ProjectTasksTable = ({ tasks = [], selectedClient }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	console.log('Tareas recibidas:', tasks); // <-- Diagnóstico

	return (
		<>
			<div className="flex justify-end mb-4">
				<Button text="Agregar Tarea" onClick={handleOpenModal} icon={FaPlus} />
			</div>
			<table className="min-w-full bg-white border border-gray-200">
				<thead>
					<tr>
						<th className="border px-4 py-2">Título</th>
						<th className="border px-4 py-2">Descripción</th>
						<th className="border px-4 py-2">Prioridad</th>
						<th className="border px-4 py-2">Estado</th>
						<th className="border px-4 py-2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{tasks.length > 0 ? (
						tasks.map((task) => (
							<tr key={task.id || task.taskId}>
								<td className="border px-4 py-2">{task.title}</td>
								<td className="border px-4 py-2">{task.description}</td>
								<td className="border px-4 py-2">{task.priority}</td>
								<td className="border px-4 py-2">{task.status || '-'}</td>
								<td className="border px-4 py-2">{/* Botones de acción */}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className="text-center py-4">
								No hay tareas para este proyecto.
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{isModalOpen && (
				<ProjectTaskForm
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onSave={handleCloseModal}
					initialData={null}
					selectedClient={selectedClient}
				/>
			)}
		</>
	);
};

export default ProjectTasksTable;
