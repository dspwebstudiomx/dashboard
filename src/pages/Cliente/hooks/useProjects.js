import { useState } from "react";
import axios from "axios";

const SERVICE_COSTS = {
  "Consultoria SEO": 2000,
  "Consultoría UX/UI": 2500,
  "Consultoría de Diseño Web": 2200,
  "Desarrollo Web": 8000,
  "Diseño Web": 3000,
  "E-commerce": 4000,
  "Integración de APIs": 1800,
  "Landing Page": 6500,
  "Mantenimiento Web": 4500,
  "Optimización SEO": 1700,
  "Rediseño Web": 3500,
};

const SECTION_COSTS = {
  "Quienes Somos": 500,
  "Nuestros Servicios": 1100,
  Proyectos: 1000,
  Contacto: 1500,
  Blog: 1500,
  Testimonios: 500,
  Equipo: 500,
  Clientes: 500,
  Portafolio: 1500,
  Ubicación: 600,
  "Preguntas Frecuentes": 800,
  "Términos y Condiciones": 1100,
  "Redes Sociales": 600,
  "Política de Privacidad": 1100,
  "Política de Cookies": 1100,
  "Aviso Legal": 1100,
  Facturación: 1800,
};

const initialProject = () => ({
  title: "",
  description: "",
  services: [],
  sections: [],
  startDate: "",
  dueDate: "",
  priority: "Media",
  id: Date.now(),
});

export default function useProjects(selectedClient, onUpdateProjects) {
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(initialProject());
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const projectWithId = { ...newProject, id: Date.now() };

    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects) ? client.projects : [];
          // Si project no es array, lo inicializa
          const projectTitles = Array.isArray(client.project) ? client.project : [];
          // Agrega el nuevo título solo si no existe aún
          const newProjectTitles = projectTitles.includes(projectWithId.title)
            ? projectTitles
            : [...projectTitles, projectWithId.title];

          return {
            ...client,
            project: newProjectTitles,
            projects: [...projects, projectWithId]
          };
        }
        return client;
      });

      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      onUpdateProjects(projectWithId);
      setNewProject(initialProject());
      setShowForm(false);
    } catch (error) {
      console.error("Error al obtener o actualizar los clientes:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects) ? client.projects : [];
          return {
            ...client,
            projects: projects.filter((p) => p.id !== projectId),
          };
        }
        return client;
      });

      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      onUpdateProjects(
        updatedClients.find((c) => c.id === selectedClient.id).projects
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleEditClick = (project) => {
    setEditProjectId(project.id);
    setEditProject({ ...project });
  };

  const handleEditInputChange = (e) => {
    setEditProject({
      ...editProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects) ? client.projects : [];
          const updatedProjects = projects.map((p) =>
            p.id === editProject.id ? editProject : p
          );
          return {
            ...client,
            // Actualiza el campo principal "project" con el título editado
            project: editProject.title,
            projects: updatedProjects,
          };
        }
        return client;
      });

      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      onUpdateProjects(
        updatedClients.find((c) => c.id === selectedClient.id).projects
      );
      setEditProjectId(null);
      setEditProject(null);
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  return {
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
    SERVICE_COSTS,
    SECTION_COSTS,
  };
}