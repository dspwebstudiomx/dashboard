import { useState } from "react";
import axios from "axios";

export const SERVICE_COSTS = {
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
  "Agregar Página": 1500,
};

export const SECTION_COSTS = {
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
  otherServiceAmount: 0,
  otherSectionAmount: 0,
  startDate: "",
  dueDate: "",
  priority: "Media",
  completed: false,
  status: "",
  totalProgress: "",
  costs: {
    totalServices: 0,
    totalSections: 0,
    netPayable: 0,
    baseRate: 0,
    ivaTax: 0,
    subtotal: 0,
    ivaRetention: 0,
    isrRetention: 0,
    isrTax: 0,
  },
  tasks: [],
});

export default function useProjects(selectedClient, onUpdateProjects) {
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(initialProject());
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [totalServices, setTotalServices] = useState(0);
  const [totalSections, setTotalSections] = useState(0);


  // Estados para cupón y discount
  const [coupon, setcoupon] = useState('');
  const [discount, setdiscount] = useState(0);
  const [couponMsg, setcouponMsg] = useState('');



  // Validar cupón
  const validarcoupon = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/coupones/validar?codigo=${coupon}`);
      if (res.data.valido) {
        setdiscount(res.data.discount);
        setcouponMsg(`¡Cupón aplicado! ${res.data.discount}% de discount.`);
      } else {
        setdiscount(0);
        setcouponMsg('Cupón inválido o expirado.');
      }
    } catch {
      setdiscount(0);
      setcouponMsg('Error al validar el cupón.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const totalServices = (newProject.services || []).reduce((acc, service) => acc + (SERVICE_COSTS[service] || 0), 0);
    const otherServiceAmount = Number(newProject.otherServiceAmount) || 0;
    setTotalServices(totalServices);

    const totalSections = (newProject.sections || []).reduce((acc, section) => acc + (SECTION_COSTS[section] || 0), 0);
    const otherSectionAmount = Number(newProject.otherSectionAmount) || 0;
    const totalSectionsWithOther = totalSections + otherSectionAmount;
    setTotalSections(totalSections);
    // Calcula los costos
    // `discount` es el estado que contiene el porcentaje (si se aplicó un cupón).
    // No sobrescribir ese estado aquí; calcular el monto descontado localmente.
    // `ProjectForm` mantiene el código de cupón en el estado `coupon`, no en `newProject.coupon`.
    // Usar `coupon` para calcular el monto descontado al crear el proyecto.
    const discountAmount = coupon ? (totalServices + totalSectionsWithOther) * (discount / 100) : 0;
    const netPayable = (totalServices + totalSectionsWithOther) - discountAmount;
    const baseRate = netPayable / 0.95332923754846;
    const ivaTax = baseRate * 0.16;
    const subtotal = baseRate + ivaTax;
    const ivaRetention = baseRate * 0.10667;
    const isrRetention = baseRate * 0.1;
    const isrTax = ivaTax * 0.1;

    // Incluye los costos en el objeto costs
    const projectWithId = {
      ...newProject,
      id: Date.now(),
      otherServiceAmount: otherServiceAmount,
      otherSectionAmount: otherSectionAmount,
      costs: {
        totalServices: totalServices + otherServiceAmount,
        totalSections: totalSectionsWithOther,
        netPayable,
        baseRate,
        ivaTax,
        subtotal,
        ivaRetention,
        isrRetention,
        isrTax,
        discount: discountAmount,
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

      // Pasar la lista completa de proyectos actualizada para que la UI la reemplace
      const updatedClient = updatedClients.find((c) => c.id === selectedClient.id);
      onUpdateProjects(updatedClient.projects || []);
      setNewProject(initialProject());
      setShowForm(false);
      setcoupon('');
      setdiscount(0);
      setcouponMsg('');
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
    setEditProject({
      ...initialProject(),
      ...project,
      costs: {
        totalServices: project.costs?.totalServices || 0,
        totalSections: project.costs?.totalSections || 0,
        netPayable: project.costs?.netPayable || 0,
        baseRate: project.costs?.baseRate || 0,
        ivaTax: project.costs?.ivaTax || 0,
        subtotal: project.costs?.subtotal || 0,
        ivaRetention: project.costs?.ivaRetention || 0,
        isrRetention: project.costs?.isrRetention || 0,
        isrTax: project.costs?.isrTax || 0,
      }
    });
    setEditProjectId(project.id);
    setShowForm(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProject = async (e) => {
    e.preventDefault();

    // Recalcula los costos por si se editaron servicios o secciones
    const editTotalServices = (editProject?.services || []).reduce((acc, service) => acc + (SERVICE_COSTS[service] || 0), 0)
    const editOtherServiceAmount = Number(editProject?.otherServiceAmount) || 0;

    // Recalcula el descuento como monto (no sobrescribir el estado `discount` que mantiene el porcentaje)
    const editTotalSections = (editProject?.sections || []).reduce((acc, section) => acc + (SECTION_COSTS[section] || 0), 0);
    const editOtherSectionAmount = Number(editProject?.otherSectionAmount) || 0;
    const editTotalSectionsWithOther = editTotalSections + editOtherSectionAmount;
    // Al editar, preferir el cupón almacenado en el proyecto, si existe; si no, usar el cupón global.
    const editCouponApplied = editProject.coupon || coupon;
    const editDiscountAmount = editCouponApplied ? (editTotalServices + editTotalSectionsWithOther) * (discount / 100) : 0;
    const editNetPayable = editTotalServices + editOtherServiceAmount + editTotalSectionsWithOther - editDiscountAmount;
    const editBaseRate = editNetPayable / 0.95332923754846;
    const editIvaTax = editBaseRate * 0.16;
    const editSubtotal = editBaseRate + editIvaTax;
    const editIvaRetention = editBaseRate * 0.10667;
    const editIsrRetention = editBaseRate * 0.1;
    const editIsrTax = editIvaTax * 0.1;

    // Actualiza los costos en el proyecto editado
    const updatedEditProject = {
      ...editProject,
      costs: {
        totalServices: editTotalServices + editOtherServiceAmount,
        totalSections: editTotalSectionsWithOther,
        netPayable: editNetPayable,
        baseRate: editBaseRate,
        ivaTax: editIvaTax,
        subtotal: editSubtotal,
        ivaRetention: editIvaRetention,
        isrRetention: editIsrRetention,
        isrTax: editIsrTax,
        discount: editDiscountAmount,
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
    editProjectId,
    setEditProjectId,
    editProject,
    setEditProject,
    handleEditInputChange,
    handleInputChange,
    handleEditProject,
    handleDeleteProject,
    handleComplete,
    handleCreateProject,
    newProject,
    setNewProject,
    SERVICE_COSTS,
    SECTION_COSTS,
    handleEditClick,
    coupon,
    setcoupon,
    discount,
    setdiscount,
    couponMsg,
    setcouponMsg,
    validarcoupon,
    totalSections,
    totalServices
  };
}