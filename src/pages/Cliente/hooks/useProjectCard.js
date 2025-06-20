import { useState, useCallback } from "react";
import { useModal } from "@hooks/useModal"; // Ajusta la ruta según tu estructura

export function useProjectCard(project, handleComplete) {
  const [isCompleted, setIsCompleted] = useState(project.completed || false);
  const { isOpen: modalAdminProject, openModal, closeModal } = useModal();

  const handleCompleteClick = useCallback(async () => {
    await handleComplete(project.id);
    setIsCompleted(true);
  }, [handleComplete, project.id]);

  return {
    isCompleted,
    modalAdminProject,
    closeModal,
    openModal,
    handleCompleteClick,
  };
}