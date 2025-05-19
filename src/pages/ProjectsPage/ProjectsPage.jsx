import DashboardTemplate from "@templates/DashboardTemplate";
import { useEffect, useState } from "react";
import axios from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/clients/projects")
      .then((res) => {
        console.log("Respuesta de la API:", res.data); // <-- Agrega esto
        const clientsArray = Array.isArray(res.data)
          ? res.data
          : res.data.clients || [];
        const allProjects = clientsArray.flatMap((client) =>
          (client.projects || []).map((project) => ({
            ...project,
            clientName: client.fullName,
          }))
        );
        setProjects(allProjects);
        console.log("Proyectos encontrados:", allProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (projectId) => {
    alert(`Editar proyecto ${projectId}`);
  };

  const handleView = (projectId) => {
    alert(`Ver proyecto ${projectId}`);
  };

  const handleDelete = (projectId) => {
    alert(`Eliminar proyecto ${projectId}`);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Cliente</th>
                  <th className="px-4 py-2 border">Fecha de inicio</th>
                  <th className="px-4 py-2 border">Fecha de término</th>
                  <th className="px-4 py-2 border">Prioridad</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-2 border">{project.fullName}</td>
                    <td className="px-4 py-2 border">{project.clientName}</td>
                    <td className="px-4 py-2 border">{project.startDate}</td>
                    <td className="px-4 py-2 border">{project.endDate}</td>
                    <td className="px-4 py-2 border">{project.priority}</td>
                    <td className="px-4 py-2 border">{project.status}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleView(project.id)}>
                        Ver
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(project.id)}>
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(project.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default ProjectsPage;
