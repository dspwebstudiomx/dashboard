import React, { useState } from "react";
import DashboardTemplate from "../../templates/DashboardTemplate";
import ProjectsList from "../../components/ProjectsList";
import ProjectForm from "../../components/ProjectForm";

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
          Create New Project
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
