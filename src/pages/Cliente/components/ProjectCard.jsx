import React, { useMemo } from "react";
import ContentProjectCard from "./ProjectCard/ContentProjectCard";
import AdminProjectModal from "./ProjectCard/AdminProjectModal";
import LinePriorityCard from "./ProjectCard/LinePriority";
import { useProjectCard } from "../hooks/useProjectCard";
import { FinancialCalculate } from "../data/FinancialCalculate";

const ProjectCard = ({
  project,
  clientId,
  handleComplete,
  SERVICE_COSTS,
  SECTION_COSTS,
  onEdit,
  onDelete,
}) => {
  // Memoizar el cálculo de totalConImpuestos
  const { totalConImpuestos } = useMemo(
    () => FinancialCalculate(project, SERVICE_COSTS, SECTION_COSTS),
    [project, SERVICE_COSTS, SECTION_COSTS]
  );

  // Usar el custom hook
  const {
    isCompleted,
    modalAdminProject,
    closeModal,
    openModal,
    handleCompleteClick,
  } = useProjectCard(project, handleComplete);

  return (
    <li
      id={`Proyecto-${project.title}`}
      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden h-auto">
      {/* Línea de tarjeta */}
      <LinePriorityCard project={project} />
      {/* Contenido de la tarjeta */}
      <ContentProjectCard
        project={project}
        isCompleted={isCompleted}
        onEdit={onEdit}
        onDelete={onDelete}
        handleCompleteClick={handleCompleteClick}
        totalConImpuestos={totalConImpuestos}
        openAdminModal={openModal}
      />
      {/* Modal de administración */}
      <AdminProjectModal
        isOpen={modalAdminProject}
        onClose={closeModal}
        project={project}
        clientId={clientId}
      />
    </li>
  );
};

export default ProjectCard;
