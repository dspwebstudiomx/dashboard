import Modal from '@components/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import Button from '@components/Botones/Button';
import Priority from '../Priority';
import ServicesProjectTag from '../ServicesProjectTag';
import SectionsProjectTag from '../SectionsProjectTag';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import GrayLine from '@components/Lineas/GrayLine';

const GeneralProjectInfo = ({
	isOpen,
	onClose,
	project,
	successMessage,
	setShowTaskModal,
	tasks,
	handleEditTaskClick,
	handleDeleteTask,
}) => {
	return (
		<Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
			<div
				id="modal-content"
				className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-gray-200 text-gray-800 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-gray-100"
			>
				<div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-12 mb-8">
					<h2 id="titulo-proyecto" className="text-3xl text-center">
						{project.title}
					</h2>
					<Priority project={project} />
				</div>
				<div className="flex flex-col gap-6 py-12">
					<h2 className="text-2xl font-semibold">Descripción del Proyecto</h2>
					<span className="ml-4">
						<ProjectDescriptionInfoCard project={project} />
					</span>
				</div>

				<GrayLine />

				<div className="flex flex-col md:flex-col gap-12 py-12">
					<div className="flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
						<span className="ml-4">
							<ServicesProjectTag project={project} />
						</span>
					</div>
					<div className="flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
						<span className="ml-4">
							<SectionsProjectTag project={project} />
						</span>
					</div>
				</div>

				<GrayLine />

				<h2 className="text-2xl font-semibold text-center uppercase mt-12">Tareas</h2>
				<div
					id="Asignacion-Tareas"
					className="flex flex-col md:flex-col gap-12 rounded-2xl shadow-sm bg-gray-50 p-8"
				>
					<div className="flex flex-col md:flex-row justify-end items-center gap-4">
						<Button text="Crear Tarea" icon={FaPlus} onClick={() => setShowTaskModal(true)} />
						{successMessage && <span className="text-green-600">{successMessage}</span>}
					</div>
					{/* Tabla que muestra las tareas creadas */}
					<div className="overflow-x-auto">
						<table className="min-w-full border-collapse border border-gray-200">
							<thead>
								<tr>
									<th className="border border-gray-200 px-4 py-2">ID</th>
									<th className="border border-gray-200 px-4 py-2">Título</th>
									<th className="border border-gray-200 px-4 py-2">Descripción</th>
									<th className="border border-gray-200 px-4 py-2">Prioridad</th>
									<th className="border border-gray-200 px-4 py-2">Estado</th>
									<th className="border border-gray-200 px-4 py-2">Editar/Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{tasks && tasks.length > 0 ? (
									tasks.map((task, index) => (
										<tr key={index}>
											<td className="border border-gray-200 px-4 py-2">{task.taskId}</td>
											<td className="border border-gray-200 px-4 py-2">{task.title}</td>
											<td className="border border-gray-200 px-4 py-2">{task.description}</td>
											<td className="border border-gray-200 px-4 py-2">{task.priority}</td>
											<td className="border border-gray-200 px-4 py-2">{task.status}</td>
											<td className="border border-gray-200 px-4 py-2">
												<button
													className="bg-yellow-500 text-white px-2 py-1 rounded"
													onClick={() => handleEditTaskClick(task)}
												>
													Editar
												</button>
												<button
													onClick={() => handleDeleteTask(task.taskId)}
													className="bg-red-500 text-white px-2 py-1 rounded ml-2"
												>
													Eliminar
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={6} className="text-center py-4 text-gray-500">
											No hay tareas creadas
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default GeneralProjectInfo;
