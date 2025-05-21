import React from "react";
import Modal from "@components/Modal";
import ContentProjectCard from "./ContentProjectCard";

// Modal para administrar el proyecto
const AdminProjectModal = ({
  isOpen,
  onClose,
  project,
  isCompleted,
  onEdit,
  onDelete,
  handleCompleteClick,
  SERVICE_COSTS,
  SECTION_COSTS,
  totalConImpuestos,
  setModalAdminProject,
}) => (
  <Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
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
  </Modal>
);

export default AdminProjectModal;
