import React, { useState } from "react";
import DashboardTemplate from "../../templates/DashboardTemplate";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";

const ProjectsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsFormVisible(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedProject(null);
  };

  return (
    <DashboardTemplate>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleCreateProject}>
          Crear nuevo proyecto
        </button>
        {isFormVisible ? (
          <ProjectForm project={selectedProject} onClose={handleCloseForm} />
        ) : (
          <ProjectsList onEdit={handleEditProject} />
        )}
      </div>
    </DashboardTemplate>
  );
};

export default ProjectsPage;
