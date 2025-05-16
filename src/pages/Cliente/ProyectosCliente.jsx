import Modal from "@components/Modal";
import axios from "axios";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const SERVICE_COSTS = {
  "Consultoria SEO": 2000,
  "Consultoría UX/UI": 2500,
  "Consultoría de Diseño Web": 2200,
  "Desarrollo Web": 8000,
  "Diseño Web": 3000,
  "E-commerce": 7000,
  "Integración de APIs": 1800,
  "Landing Page": 1500,
  "Mantenimiento Web": 1200,
  "Optimización SEO": 1700,
  "Rediseño Web": 3500,
};

const SECTION_COSTS = {
  "Quienes Somos": 2000,
  Servicios: 2500,
  Proyectos: 2200,
  Contacto: 8000,
  Blog: 3000,
  Testimonios: 7000,
  Equipo: 1800,
  Clientes: 1500,
  Portafolio: 1500,
  Ubicación: 1200,
  "Preguntas Frecuentes": 2000,
  "Términos y Condiciones": 1700,
  "Redes Sociales": 1700,
  "Política de Privacidad": 3500,
  "Política de Cookies": 3500,
  "Aviso Legal": 2000,
  Facturación: 1200,
};

const ProyectosCliente = ({
  isProyectExist,
  selectedClient,
  onUpdateProjects,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    services: [],
    sections: [],
    startDate: "",
    dueDate: "",
    priority: "Media",
    id: Date.now(),
  });
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
      // Obtener todos los clientes
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      // Buscar el cliente actual y actualizar sus proyectos
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects)
            ? client.projects
            : [];
          return {
            ...client,
            projects: [...projects, projectWithId],
          };
        }
        return client;
      });

      // Aquí deberías hacer una petición para actualizar el cliente en el backend
      // Por ejemplo, si tienes un endpoint para actualizar:
      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      // Actualizar el estado de los proyectos en el frontend
      onUpdateProjects(projectWithId);

      // Reiniciar el formulario
      setNewProject({
        title: "",
        description: "",
        startDate: "",
        dueDate: "",
        priority: "Media",
        services: [],
        sections: [],
        id: Date.now(),
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error al obtener o actualizar los clientes:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      // Obtener todos los clientes
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      // Buscar el cliente actual y eliminar el proyecto
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects)
            ? client.projects
            : [];
          return {
            ...client,
            projects: projects.filter((p) => p.id !== projectId),
          };
        }
        return client;
      });

      // Actualizar el cliente en el backend
      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      // Actualizar el estado de los proyectos en el frontend
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
      // Obtener todos los clientes
      const response = await axios.get("http://localhost:5000/api/clients");
      const clients = response.data;

      // Actualizar el proyecto en el cliente seleccionado
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          const projects = Array.isArray(client.projects)
            ? client.projects
            : [];
          return {
            ...client,
            projects: projects.map((p) =>
              p.id === editProject.id ? editProject : p
            ),
          };
        }
        return client;
      });

      // Actualizar el cliente en el backend
      await axios.put(
        `http://localhost:5000/api/clients/${selectedClient.id}`,
        updatedClients.find((c) => c.id === selectedClient.id)
      );

      // Actualizar el estado de los proyectos en el frontend
      onUpdateProjects(
        updatedClients.find((c) => c.id === selectedClient.id).projects
      );

      setEditProjectId(null);
      setEditProject(null);
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  return (
    <article className="grid">
      <h2 className="text-2xl font-semibold mb-4">Mis Proyectos</h2>
      <p className="mb-4">
        Aquí puedes ver todos los proyectos relacionados con este cliente.
      </p>

      <div className="flex justify-start mb-6">
        {!showForm && (
          <button
            className="text-white px-6 py-4 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-2xl w-full md:w-[320px] mt-8"
            onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Agregar Proyecto"}
          </button>
        )}
      </div>

      {showForm && (
        <Modal
          title="Agregar Proyecto"
          onClick={() => setShowForm(false)}
          isOpen={showForm}>
          <form
            id="form-proyecto"
            className="flex flex-col gap-6 md:gap-12 p-4 md:p-8 rounded-lg mb-8 overflow-y-auto"
            onSubmit={handleCreateProject}>
            {/* Nombre del Proyecto */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                name="title"
                placeholder="Título del proyecto"
                value={newProject.title}
                onChange={handleInputChange}
                required
                className="p-2 rounded border"
              />
            </div>

            {/* Tipo de Servicio */}
            <div className="flex flex-col gap-4">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Tipo de Servicio
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {[
                  "Consultoria SEO",
                  "Consultoría UX/UI",
                  "Consultoría de Diseño Web",
                  "Desarrollo Web",
                  "Diseño Web",
                  "E-commerce",
                  "Integración de APIs",
                  "Landing Page",
                  "Mantenimiento Web",
                  "Optimización SEO",
                  "Rediseño Web",
                ]
                  .sort((a, b) =>
                    a.localeCompare(b, "es", { sensitivity: "base" })
                  )
                  .map((services) => (
                    <label key={services} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="services"
                        value={services}
                        checked={
                          Array.isArray(newProject.services)
                            ? newProject.services.includes(services)
                            : false
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewProject((prev) => {
                            const prevServices = Array.isArray(prev.services)
                              ? prev.services
                              : [];
                            if (checked) {
                              return {
                                ...prev,
                                services: [...prevServices, services],
                              };
                            } else {
                              return {
                                ...prev,
                                services: prevServices.filter(
                                  (s) => s !== services
                                ),
                              };
                            }
                          });
                        }}
                      />
                      <span>
                        {services}{" "}
                        <span className="text-xs text-gray-500">
                          (${SERVICE_COSTS[services]})
                        </span>
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            {/* Secciones del Proyecto */}
            <div className="flex flex-col gap-6">
              <label className="text-xl text-gray-600 dark:text-gray-300">
                Secciones del Proyecto
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {[
                  "Quienes Somos",
                  "Servicios",
                  "Proyectos",
                  "Contacto",
                  "Blog",
                  "Testimonios",
                  "Equipo",
                  "Clientes",
                  "Portafolio",
                  "Ubicación",
                  "Preguntas Frecuentes",
                  "Términos y Condiciones",
                  "Redes Sociales",
                  "Política de Privacidad",
                  "Política de Cookies",
                  "Aviso Legal",
                  "Facturación",
                ]
                  .sort((a, b) =>
                    a.localeCompare(b, "es", { sensitivity: "base" })
                  )
                  .map((sections) => (
                    <div key={sections} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="sections"
                        value={sections}
                        checked={
                          Array.isArray(newProject.services)
                            ? newProject.services.includes(sections)
                            : false
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewProject((prev) => {
                            const prevServices = Array.isArray(prev.services)
                              ? prev.services
                              : [];
                            if (checked) {
                              return {
                                ...prev,
                                services: [...prevServices, sections],
                              };
                            } else {
                              return {
                                ...prev,
                                services: prevServices.filter(
                                  (s) => s !== sections
                                ),
                              };
                            }
                          });
                        }}
                      />
                      <span>
                        {sections}{" "}
                        <span className="text-xs text-gray-500">
                          (${SECTION_COSTS[sections]})
                        </span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Descripción del Proyecto */}
            <div className="flex flex-col gap-6">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Descripción general del Proyecto
              </label>
              <textarea
                name="description"
                placeholder=""
                value={newProject.description}
                onChange={handleInputChange}
                required
                className="p-2 rounded border min-h-[220px] dark:bg-gray-600"
              />
            </div>

            {/* Fechas y Prioridad */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="date"
                name="startDate"
                value={newProject.startDate}
                onChange={handleInputChange}
                required
                className="p-2 rounded border"
              />
              <input
                type="date"
                name="dueDate"
                value={newProject.dueDate}
                onChange={handleInputChange}
                required
                className="p-2 rounded border"
              />
              <select
                name="priority"
                value={newProject.priority}
                onChange={handleInputChange}
                className="p-2 rounded border">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            {/* Botón de Crear Proyecto */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition mt-8 w-full md:w-[210px] mx-auto">
              Crear Proyecto
            </button>
          </form>
        </Modal>
      )}

      {isProyectExist && (
        <ul className="mt-12 grid md:grid-cols-2 gap-12">
          {isProyectExist && selectedClient.projects.length > 0 ? (
            selectedClient.projects.map((project) => {
              const total = Array.isArray(project.services)
                ? project.services.reduce(
                    (sum, sections) => sum + (SERVICE_COSTS[sections] || 0),
                    0
                  )
                : 0;
              return (
                <li
                  id={`Proyecto-${project.title}`}
                  key={project.id}
                  className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg p-4">
                  {editProjectId === project.id ? (
                    // Formulario de edición
                    <form
                      onSubmit={handleEditProject}
                      className="flex flex-col gap-2 mb-4">
                      <input
                        type="text"
                        name="title"
                        value={editProject.title}
                        onChange={handleEditInputChange}
                        required
                        className="p-2 rounded border"
                      />
                      <textarea
                        name="description"
                        value={editProject.description}
                        onChange={handleEditInputChange}
                        required
                        className="p-2 rounded border"
                      />
                      <div className="flex gap-2">
                        <input
                          type="date"
                          name="startDate"
                          value={editProject.startDate}
                          onChange={handleEditInputChange}
                          required
                          className="p-2 rounded border"
                        />
                        <input
                          type="date"
                          name="dueDate"
                          value={editProject.dueDate}
                          onChange={handleEditInputChange}
                          required
                          className="p-2 rounded border"
                        />
                        <select
                          name="priority"
                          value={editProject.priority}
                          onChange={handleEditInputChange}
                          className="p-2 rounded border">
                          <option value="Alta">Alta</option>
                          <option value="Media">Media</option>
                          <option value="Baja">Baja</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                          Guardar
                        </button>
                        <button
                          type="button"
                          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                          onClick={() => {
                            setEditProjectId(null);
                            setEditProject(null);
                          }}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <article className="flex flex-col gap-4 p-4">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="flex flex-col gap-1 mt-4">
                        <p className="text-sm dark:text-gray-100">
                          Fecha de inicio:{" "}
                          {new Date(project.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm dark:text-gray-100">
                          Fecha de término:{" "}
                          {new Date(project.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-100">
                          Días restantes al día de hoy:{" "}
                          <span className="text-blue-900 dark:text-blue-400 font-semibold">
                            {Math.ceil(
                              (new Date(project.dueDate) - new Date()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </span>
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-100 font-semibold mt-2">
                          Total del proyecto:{" "}
                          <span className="text-blue-900 dark:text-blue-400">
                            ${total.toLocaleString("es-MX")}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-base font-medium py-1 px-6 rounded-full ${
                              project.priority === "Alta"
                                ? "bg-red-600 text-gray-100"
                                : project.priority === "Media"
                                ? "bg-yellow-400 text-gray-800"
                                : "bg-green-600 text-gray-100"
                            }`}>
                            {project.priority}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                          <button className="text-white px-4 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition duration-300">
                            Ver Detalles
                          </button>
                          <button
                            className="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
                            onClick={() => handleEditClick(project)}
                            type="button">
                            Editar
                          </button>
                          <button
                            className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-600 transition duration-300"
                            onClick={() => handleDeleteProject(project.id)}
                            type="button">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </article>
                  )}
                </li>
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-8 gap-8 mt-6 dark:bg-gray-700 bg-white border-2 border-gray-300 dark:border-gray-600">
              <p className="text-gray-800 dark:text-gray-100 flex items-center gap-2 font-semibold">
                <MdErrorOutline
                  size={24}
                  className="inline-block text-2xl text-red-700"
                />
                No hay proyectos disponibles para {selectedClient.fullName}{" "}
                {selectedClient.lastName} {selectedClient.lastName2}.
              </p>
              <button
                className="text-white px-6 py-2 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-2xl"
                onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancelar" : "Agregar Proyecto"}
              </button>
            </div>
          )}
        </ul>
      )}
    </article>
  );
};

export default ProyectosCliente;
