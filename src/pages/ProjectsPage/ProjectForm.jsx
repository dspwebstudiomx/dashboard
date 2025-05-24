import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectForm = ({ project, onClose }) => {
  const [name, setName] = useState(project ? project.name : "");
  const [client, setClient] = useState(project ? project.client : "");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Cargar clientes desde clients.json
    const fetchClients = async () => {
      try {
        const response = await axios.get("/server/clients.json");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = { name, client };

    try {
      // Enviar el proyecto al servidor
      const response = await axios.post("/server/projects", newProject);
      console.log("Project saved:", response.data);

      // Cerrar el formulario después de guardar
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        {project ? "Edit Project" : "Create Project"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Client</label>
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full p-2 border rounded">
          <option value="" disabled>
            Select a client
          </option>
          {(Array.isArray(clients) ? clients : []).map((client) => (
            <option key={client.id} value={client.name}>
              {client.fullName} {client.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}>
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
