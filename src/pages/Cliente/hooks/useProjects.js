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
  completed: false,
  status: "",
  totalProgress: "",
  tasks: [],

});

export default function useProjects(selectedClient, onUpdateProjects) {
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(initialProject());
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  // Estados para cupón y descuento
  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [cuponMsg, setCuponMsg] = useState('');

  // Cálculos de costos y totales
  const subtotal =
    (newProject.services || []).reduce((acc, service) => acc + (SERVICE_COSTS[service] || 0), 0) +
    (newProject.sections || []).reduce((acc, section) => acc + (SECTION_COSTS[section] || 0), 0);
  const ivaTax = subtotal * 0.16 || 0;
  const isrTax = ivaTax * 0.1 || 0;
  const total = subtotal + ivaTax + isrTax - (subtotal * descuento) / 100 || 0;

  // Validar cupón
  const validarCupon = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cupones/validar?codigo=${cupon}`);
      if (res.data.valido) {
        setDescuento(res.data.descuento);
        setCuponMsg(`¡Cupón aplicado! ${res.data.descuento}% de descuento.`);
      } else {
        setDescuento(0);
        setCuponMsg('Cupón inválido o expirado.');
      }
    } catch {
      setDescuento(0);
      setCuponMsg('Error al validar el cupón.');
    }
  };

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    // Incluye los costos en el objeto costs
    const projectWithId = {
      ...newProject,
      id: Date.now(),
      costs: {
        totalServices: (newProject.services || []).reduce(
          (acc, service) => acc + (SERVICE_COSTS[service] || 0), 0
        ),
        totalSections: (newProject.sections || []).reduce(
          (acc, section) => acc + (SECTION_COSTS[section] || 0), 0
        ),
        subtotalCost: subtotal,
        ivaTax,
        isrTax,
        totalCost: total,
        descuento,
      }
    };

    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects) ? client.projects : [];
          const projectTitles = Array.isArray(client.project) ? client.project : [];
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
      setCupon('');
      setDescuento(0);
      setCuponMsg('');
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
    setEditProject(project);
    setEditProjectId(project.id);
    setShowForm(true);
  };

  const handleEditInputChange = (e) => {
    setEditProject({
      ...editProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProject = async (e) => {
    e.preventDefault();

    // Recalcula los costos por si se editaron servicios o secciones
    const totalServices = (editProject.services || []).reduce(
      (acc, service) => acc + (SERVICE_COSTS[service] || 0), 0
    );
    const totalSections = (editProject.sections || []).reduce(
      (acc, section) => acc + (SECTION_COSTS[section] || 0), 0
    );
    const subtotalCost = totalServices + totalSections;
    const ivaTax = subtotalCost * 0.16;
    const isrTax = ivaTax * 0.1;
    const totalCost = subtotalCost + ivaTax + isrTax;

    // Actualiza los costos en el proyecto editado
    const updatedEditProject = {
      ...editProject,
      costs: {
        totalServices,
        totalSections,
        subtotalCost,
        ivaTax,
        isrTax,
        totalCost,
      }
    };

    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects) ? client.projects : [];
          const updatedProjects = projects.map((p) =>
            p.id === updatedEditProject.id ? updatedEditProject : p
          );
          return {
            ...client,
            project: updatedEditProject.title,
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

  const handleComplete = async (projectId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/clients/${selectedClient.id}/projects/${projectId}/completed`
      );
      // Opcional: Actualiza la lista de proyectos en el frontend
      const response = await axios.get("http://localhost:5000/api/clients");
      const client = response.data.find((c) => c.id === selectedClient.id);
      if (client && client.projects) {
        onUpdateProjects(client.projects);
      }
    } catch (error) {
      console.error("Error al marcar el proyecto como terminado:", error);
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
    handleComplete,
    SERVICE_COSTS,
    SECTION_COSTS,
    subtotal,
    ivaTax,
    isrTax,
    total,
    cupon,
    setCupon,
    descuento,
    setDescuento,
    cuponMsg,
    setCuponMsg,
    validarCupon,
  };
}