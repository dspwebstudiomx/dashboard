import Button from '@components/Botones/Button';
import React, { useState } from 'react';
import ProjectTaskForm from './ProjectTaskForm';
import { FaPlus } from 'react-icons/fa6';

const ProjectTasksTable = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<>
			{/* Botón para agregar tarea, si le doy clic me abre el componente ProjectTaskForm */}
			<div className="flex justify-end mb-4">
				<Button text="Agregar Tarea" onClick={handleOpenModal} icon={FaPlus} />
			</div>
			{/* Tabla de tareas */}
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
					{/* Aquí se mapearían las tareas */}
					{/* Ejemplo de una fila de tarea */}
					<tr>
						<td className="border px-4 py-2">Tarea 1</td>
						<td className="border px-4 py-2">Descripción de la tarea 1</td>
						<td className="border px-4 py-2">Alta</td>
						<td className="border px-4 py-2">Pendiente</td>
						<td className="border px-4 py-2">
							{/* Botones para editar y eliminar tarea */}
							<button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
							<button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
						</td>
					</tr>
				</tbody>
			</table>
			{isModalOpen && (
				<ProjectTaskForm
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onSave={handleCloseModal}
					initialData={null}
				/>
			)}
		</>
	);
};

export default ProjectTasksTable;
