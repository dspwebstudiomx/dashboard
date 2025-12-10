import React, { useState } from 'react';
import Modal from '@components/Modal';
import Priority from '../Priority';
import ProjectDescriptionInfoCard from '../ProjectDescriptionInfoCard';
import GrayLine from '@components/Lineas/GrayLine';

import EditActionButton from '../EditActionButton';
import DeleteActionButton from '../DeleteActionButton';
import ProjectForm from '../ProjectForm';
// import { SERVICE_COSTS, SECTION_COSTS } from '../../hooks/useProjects';
import ProjectActionButtons from '../ProjectActionButtons';
import ServicesSectionsInfo from './ServicesSectionsInfo';
import CloseActionButton from '../CloseActionButton';
import Button from '@components/Botones/Button';

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
	onEdit,
	onDelete,
	handleCompleteClick,
}) => {
	// Estado para controlar el modal de confirmación de eliminación
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	// Estado para controlar el modal de confirmación de cierre
	const [isCloseConfirmModalOpen, setIsCloseConfirmModalOpen] = useState(false);

	// Manejar la apertura y cierre de los modales
	const openConfirmModal = () => setIsConfirmModalOpen(true);
	const closeConfirmModal = () => setIsConfirmModalOpen(false);

	const openCloseConfirmModal = () => setIsCloseConfirmModalOpen(true);
	const closeCloseConfirmModal = () => setIsCloseConfirmModalOpen(false);

	// Manejar la confirmación de eliminación
	const handleConfirmDelete = () => {
		if (onDelete) onDelete();
		closeConfirmModal();
	};

	// Manejar la confirmación de cierre
	const handleConfirmClose = async () => {
		try {
			if (handleCompleteClick) await handleCompleteClick();
		} catch (err) {
			console.error('Error al cerrar proyecto:', err);
		} finally {
			closeCloseConfirmModal();
			if (onClose) onClose();
		}
	};

	const handleCloseProject = () => {
		// Abrir el modal de confirmación para cerrar el proyecto
		openCloseConfirmModal();
	};

	const ProjectInfoTitle = () => {
		return (
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
				<div className="flex gap-4">
					<EditActionButton onClick={onEdit} text="Editar proyecto" />
					{/* Modificar el botón de eliminación para abrir el modal */}
					<DeleteActionButton onClick={openConfirmModal} text="Eliminar proyecto" />
					{/* Modificar el botón de "Cerrar Proyecto" para abrir el modal */}
					<CloseActionButton
						handleCompleteClick={handleCloseProject}
						text="Cerrar Proyecto"
						onClick={handleCloseProject}
					/>
				</div>
			</div>
		);
	};

	const ProjectInfoContent = () => {
		return (
			<div
				id="modal-content"
				className="flex flex-col gap-8 pb-20 rounded-2xl border-2 border-blue-200 text-gray-800 bg-white p-8 md:p-10 shadow-lg dark:bg-gray-800 dark:text-gray-100 md:mr-10 max-w-screen-xl mx-auto"
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
			</div>
		);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} title={<ProjectInfoTitle />}>
				<ProjectInfoContent />
			</Modal>

			{/* Modal de confirmación de eliminación */}
			<Modal
				isOpen={isConfirmModalOpen}
				onClose={closeConfirmModal}
				title="Confirmar eliminación de Proyecto"
			>
				<div className="flex flex-col gap-6">
					<p className="text-xl">¿Estás seguro de que deseas eliminar este proyecto?</p>
					<div className="flex justify-end gap-4 py-6">
						<Button variant="secondary" onClick={closeConfirmModal} text={'Cancelar'} size="lg" />
						<Button
							variant="primary"
							onClick={handleConfirmDelete}
							text={'Eliminar Proyecto'}
							size="lg"
						/>
					</div>
				</div>
			</Modal>

			{/* Modal de confirmación de cierre */}
			<Modal
				isOpen={isCloseConfirmModalOpen}
				onClose={closeCloseConfirmModal}
				title="Confirmar cierre de Proyecto"
			>
				<div className="flex flex-col gap-6">
					<p className="text-xl">¿Estás seguro de que deseas cerrar este proyecto?</p>
					<div className="flex justify-end gap-4 py-6">
						<Button
							variant="secondary"
							onClick={closeCloseConfirmModal}
							text={'Cancelar'}
							size="lg"
						/>
						<Button
							variant="primary"
							onClick={handleConfirmClose}
							text={'Cerrar Proyecto'}
							size="lg"
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default GeneralProjectInfo;
