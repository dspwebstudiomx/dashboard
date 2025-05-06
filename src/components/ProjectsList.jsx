import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectsList = ({ onEdit }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Cargar datos desde clients.json
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/server/clients.json");
        const clients = response.data;

        // Simulación: Crear proyectos basados en los clientes
        const mockProjects = clients.map((client, index) => ({
          id: index + 1,
          name: `Project for ${client.name}`,
          client: client.name,
        }));

        setProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchProjects();
  }, []);

  // Función para eliminar un proyecto
  const onDelete = (projectToDelete) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectToDelete.id
    );
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Project List</h2>
      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{project.name}</h2>
                <p className="text-gray-600">Client: {project.client}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => onEdit(project)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(project)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No projects available.</p>
      )}
    </div>
  );
};

export default ProjectsList;
