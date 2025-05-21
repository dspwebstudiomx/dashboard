import { useState, useCallback } from "react";

export function useProjectCard(project, handleComplete) {
  const [isCompleted, setIsCompleted] = useState(project.completed || false);
  const [modalAdminProject, setModalAdminProject] = useState(false);

  const closeModal = useCallback(() => {
    setModalAdminProject(false);
  }, []);

  const openModal = useCallback(() => {
    setModalAdminProject(true);
  }, []);

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