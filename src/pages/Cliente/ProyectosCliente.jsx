import Modal from '@components/Modal';
import { MdErrorOutline } from 'react-icons/md';
import useProjects from './hooks/useProjects';
import ProjectForm from './components/ProjectForm';
import ProjectCard from './components/ProjectCard';
import Button from '@components/Botones/Button';
import { IoMdAdd } from 'react-icons/io';

const ProyectosCliente = ({ selectedClient, onUpdateProjects }) => {
	const {
		showForm,
		setShowForm,
		newProject,
		setNewProject,
		editProjectId,
		editProject,
		setEditProjectId,
		setEditProject,
		handleInputChange,
		handleCreateProject,
		handleDeleteProject,
		handleEditClick,
		handleEditInputChange,
		handleEditProject,
		handleComplete,
		SERVICE_COSTS,
		SECTION_COSTS,
	} = useProjects(selectedClient, onUpdateProjects);

	return (
		<article className="grid">
			<div className="flex flex-col md:flex-row justify-between gap-6 mb-0">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Mis Proyectos</h2>
					<p className="mb-4 text-lg">
						Aquí puedes ver todos los proyectos relacionados con{' '}
						<span className="font-semibold">
							{selectedClient.fullName} {selectedClient.lastName} {selectedClient.lastName2}. <br />
						</span>{' '}
						<br />
						Puedes agregar, editar o eliminar proyectos según sea necesario.
					</p>
				</div>
				<div className="flex items-center justify-center md:justify-end">
					<Button text="Agregar Proyecto" onClick={() => setShowForm(true)} icon={IoMdAdd} />
				</div>
			</div>

			{(showForm || editProjectId) && (
				<Modal
					title={editProjectId ? 'Editar Proyecto' : 'Crear Proyecto'}
					onClick={() => {
						setShowForm(false);
						setEditProjectId(null);
						setEditProject(null);
					}}
					isOpen={showForm || editProjectId}
				>
					<ProjectForm
						isEdit={!!editProjectId}
						project={editProjectId ? editProject : newProject}
						onChange={editProjectId ? handleEditInputChange : handleInputChange}
						onSubmit={editProjectId ? handleEditProject : handleCreateProject}
						setProject={editProjectId ? setEditProject : setNewProject}
						SERVICE_COSTS={SERVICE_COSTS}
						SECTION_COSTS={SECTION_COSTS}
					/>
				</Modal>
			)}

			<ul id="lista-proyectos" className="mt-12 grid md:grid-cols-2 gap-12 items-start">
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
						/>
					))
				) : (
					<div
						id="ventana-no-proyecto"
						className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-8 gap-8 mt-6 dark:bg-gray-700 bg-white border-2 border-gray-300 dark:border-gray-600"
					>
						<p className="text-gray-800 dark:text-gray-100 flex items-center gap-2 font-semibold">
							<MdErrorOutline size={24} className="inline-block text-2xl text-red-700" />
							No hay proyectos disponibles para {selectedClient.fullName} {selectedClient.lastName}{' '}
							{selectedClient.lastName2}.
						</p>
						<Button text="Agregar Proyecto" onClick={() => setShowForm(true)} />
					</div>
				)}
			</ul>
		</article>
	);
};

export default ProyectosCliente;
