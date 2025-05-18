import Modal from "@components/Modal";
import { MdErrorOutline } from "react-icons/md";
import useProjects from "./hooks/useProjects";
import ProjectForm from "./components/ProjectForm";
import ProjectCard from "./components/ProjectCard";

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
            Aquí puedes ver todos los proyectos relacionados con{" "}
            <span className="font-semibold">
              {selectedClient.fullName} {selectedClient.lastName}{" "}
              {selectedClient.lastName2}. <br />
            </span>
            Puedes agregar, editar o eliminar proyectos según sea necesario.
          </p>
        </div>
        <div className="flex justify-start mb-6">
          {!showForm && (
            <button
              className="text-white px-6 py-2 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-2xl w-full md:w-[180px] mt-8"
              onClick={() => setShowForm(true)}>
              Agregar Proyecto
            </button>
          )}
        </div>
      </div>

      {(showForm || editProjectId) && (
        <Modal
          title={editProjectId ? "Editar Proyecto" : "Crear Proyecto"}
          onClick={() => {
            setShowForm(false);
            setEditProjectId(null);
            setEditProject(null);
          }}
          isOpen={showForm || editProjectId}>
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

      <ul className="mt-12 grid md:grid-cols-2 gap-12">
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
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-8 gap-8 mt-6 dark:bg-gray-700 bg-white border-2 border-gray-300 dark:border-gray-600">
            <p className="text-gray-800 dark:text-gray-100 flex items-center gap-2 font-semibold">
              <MdErrorOutline
                size={24}
                className="inline-block text-2xl text-red-700"
              />
              No hay proyectos disponibles para {selectedClient.fullName}{" "}
              {selectedClient.lastName} {selectedClient.lastName2}.
            </p>
            <button
              className="text-white px-6 py-2 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-2xl"
              onClick={() => setShowForm(true)}>
              Agregar Proyecto
            </button>
          </div>
        )}
      </ul>
    </article>
  );
};

export default ProyectosCliente;
