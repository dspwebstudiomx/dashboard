import React from 'react';
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
	const handleCloseProject = async () => {
		try {
			if (handleCompleteClick) await handleCompleteClick();
		} catch (err) {
			// captura interna: dejamos que el cierre ocurra de todas formas
			console.error('Error al cerrar proyecto:', err);
		} finally {
			if (onClose) onClose();
		}
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
				<div className="flex gap-4 mt-12">
					<EditActionButton onClick={onEdit} text="Editar proyecto" />
					<DeleteActionButton onClick={onDelete} text="Eliminar proyecto" />
					<CloseActionButton
						handleCompleteClick={handleCompleteClick}
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
		</>
	);
};

export default GeneralProjectInfo;
