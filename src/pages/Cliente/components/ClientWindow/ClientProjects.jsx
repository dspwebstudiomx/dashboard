import Modal from '@components/Modal';
import { MdErrorOutline } from 'react-icons/md';

import Button from '@components/Botones/Button';
import { IoMdAdd } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../ProjectForm';
import useProjects from '../../hooks/useProjects';

const ClientProjects = ({ selectedClient, onUpdateProjects }) => {
	const {
		showForm,
		setShowForm,
		editProjectId,
		setEditProjectId,
		editProject,
		setEditProject,
		handleEditInputChange,
		handleInputChange,
		handleEditProject,
		handleDeleteProject,
		handleComplete,
		handleCreateProject,
		newProject,
		setNewProject,
		SERVICE_COSTS,
		SECTION_COSTS,
		subtotal,
		ivaTax,
		isrTax,
		netPayable,
		editSubtotal,
		editIvaTax,
		editIsrTax,
		editTotal,
		handleEditClick,
	} = useProjects(selectedClient, onUpdateProjects);

	if (!selectedClient) {
		return <div>Cargando datos del cliente...</div>;
	}

	return (
		<section className="flex flex-col justify-between gap-6 mb-0 mt-20">
			<header className="flex flex-col items-start justify-center mb-6">
				<h2 className="text-2xl font-semibold mb-4">Mis Proyectos</h2>
				<p className="mb-4 text-lg">
					Aquí puedes ver todos los proyectos relacionados con{' '}
					<span className="font-semibold">
						{selectedClient.fullName} {selectedClient.lastName} {selectedClient.lastName2}. <br />
					</span>{' '}
					<br />
					Puedes agregar, editar o eliminar proyectos según sea necesario.
				</p>
				<div className="flex items-center justify-center md:justify-end w-full">
					<Button text="Agregar Proyecto" onClick={() => setShowForm(true)} icon={IoMdAdd} />
				</div>
			</header>
			<ul id="lista-proyectos" className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
				{selectedClient.projects && selectedClient.projects.length > 0 ? (
					selectedClient.projects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							SERVICE_COSTS={SERVICE_COSTS}
							SECTION_COSTS={SECTION_COSTS}
							onEdit={() => handleEditClick(project)}
							onDelete={() => handleDeleteProject(project.id)}
							isEditing={editProjectId === project.id}
							editProject={editProject}
							handleEditInputChange={handleEditInputChange}
							handleEditProject={handleEditProject}
							setEditProjectId={setEditProjectId}
							setEditProject={setEditProject}
							handleComplete={handleComplete}
							isCompleted={project.completed}
							clientId={selectedClient.id}
							selectedClient={selectedClient}
						/>
					))
				) : (
					<div
						id="ventana-no-proyecto"
						className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-6 md:p-12 gap-8 mt-6 dark:bg-gray-700 bg-white border-2 border-gray-200 dark:border-gray-600"
					>
						<p className="text-gray-800 dark:text-gray-100 flex items-center gap-4  font-semibold md:text-lg">
							<MdErrorOutline
								size={24}
								className="inline-block text-2xl text-blue-800 w-22 h-22 md:w-12 md:h-12"
							/>
							No hay proyectos disponibles para {selectedClient.fullName} {selectedClient.lastName}{' '}
							{selectedClient.lastName2}.
						</p>
						<Button text="Agregar Proyecto" onClick={() => setShowForm(true)} icon={FaPlus} />
					</div>
				)}
			</ul>

			{(showForm || editProjectId) && (
				<Modal
					title={editProjectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
					onClose={() => {
						setShowForm(false);
						setEditProjectId(null);
						setEditProject(null);
					}}
					isOpen={showForm || editProjectId}
				>
					<ProjectForm
						isEdit={!!editProjectId}
						project={editProjectId ? editProject : newProject}
						setProject={editProjectId ? setEditProject : setNewProject}
						onChange={editProjectId ? handleEditInputChange : handleInputChange}
						SERVICE_COSTS={SERVICE_COSTS}
						SECTION_COSTS={SECTION_COSTS}
						subtotal={editProjectId ? editSubtotal : subtotal}
						ivaTax={editProjectId ? editIvaTax : ivaTax}
						isrTax={editProjectId ? editIsrTax : isrTax}
						netPayable={editProjectId ? editTotal : netPayable}
						onSubmit={editProjectId ? handleEditProject : handleCreateProject}
						// Puedes agregar aquí otras props necesarias
					/>
				</Modal>
			)}
		</section>
	);
};

export default ClientProjects;
