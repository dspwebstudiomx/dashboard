import React, { useState } from "react";
import Modal from "@components/Modal";
import ContentProjectCard from "./ContentProjectCard";
import AdminProjectModal from "./AdminProjectModal"; // <-- Importa el nuevo componente

const ProjectCard = ({
  project,
  handleComplete,
  SERVICE_COSTS,
  SECTION_COSTS,
  onEdit,
  onDelete,
}) => {
  const totalServicios = Array.isArray(project.services)
    ? project.services.reduce(
        (sum, servicio) => sum + (SERVICE_COSTS[servicio] || 0),
        0
      )
    : 0;
  const totalSecciones = Array.isArray(project.sections)
    ? project.sections.reduce(
        (sum, seccion) => sum + (SECTION_COSTS[seccion] || 0),
        0
      )
    : 0;
  const total = totalServicios + totalSecciones;
  const impuestos = total * 0.16;
  const totalConImpuestos = total + impuestos;

  // Estado local para mostrar si el proyecto está terminado
  const [isCompleted, setIsCompleted] = useState(project.completed || false);

  // Estado para el modal de administración
  const [modalAdminProject, setModalAdminProject] = useState(false);

  // Función para manejar el cierre del modal
  const closeModal = () => {
    setModalAdminProject(false);
  };

  // Función para manejar el cierre del proyecto
  const handleCompleteClick = async () => {
    await handleComplete(project.id);
    setIsCompleted(true);
  };

  return (
    <li
      id={`Proyecto-${project.title}`}
      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden h-auto">
      {/* Línea de tarjeta */}
      <div
        className={`h-2 w-full ${
          project.completed
            ? "bg-blue-600 text-gray-100"
            : project.priority === "Alta"
            ? "bg-red-500 text-gray-100"
            : project.priority === "Media"
            ? "bg-yellow-400 text-gray-800"
            : "bg-green-600 text-gray-100"
        }`}>
        <br />
      </div>
      {/* Contenido de la tarjeta */}
      <ContentProjectCard
        project={project}
        isCompleted={isCompleted}
        onEdit={onEdit}
        onDelete={onDelete}
        handleCompleteClick={handleCompleteClick}
        SERVICE_COSTS={SERVICE_COSTS}
        SECTION_COSTS={SECTION_COSTS}
        totalConImpuestos={totalConImpuestos}
        openAdminModal={() => setModalAdminProject(true)}
      />
      {/* Modal de administración */}
      <AdminProjectModal
        isOpen={modalAdminProject}
        onClose={closeModal}
        project={project}
      />
    </li>
  );
};

export default ProjectCard;
