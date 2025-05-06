import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa axios
import {
  FaUser,
  FaTasks,
  FaRegCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";

const TaskForm = ({
  selectedClient,
  setSelectedClient,
  taskForm,
  handleInputChange,
  handleAddTask,
}) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Carga los clientes desde el archivo JSON usando axios
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients"); // Ruta relativa al archivo JSON
        setClients(response.data);
        console;
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <form id="task-form" className="mb-6 p-12 py-0">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl font-semibold mb-2">Agregar/Editar Tarea</h2>
        <button
          type="button"
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Agregar Tarea
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white">
        <div className="flex flex-col gap-5">
          <label htmlFor="selectedClient" className="flex items-center">
            <FaUser className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Seleccionar cliente:
          </label>
          <select
            className="border rounded p-2 w-full"
            value={selectedClient}
            onChange={(e) => {
              console.log("Cliente seleccionado:", e.target.value);
              setSelectedClient(e.target.value);
            }}>
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.fullName} {client.lastName} - {client.project} -{" "}
                {client.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="title" className="flex items-center">
            <FaTasks className="inline mr-2 text-blue-900 text-2xl" /> Título de
            la tarea:
          </label>
          <input
            type="text"
            name="title"
            placeholder=""
            value={taskForm.title}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {console.log("taskForm.title:", taskForm.title)}
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="description" className="flex items-center">
            <FaTasks className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Descripción:
          </label>
          <input
            type="text"
            name="description"
            placeholder=""
            value={taskForm.description}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {console.log("taskForm.description:", taskForm.description)}
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="startDate" className="flex items-center">
            <FaRegCalendarAlt className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Fecha de Inicio:
          </label>
          <input
            type="date"
            name="startDate"
            value={taskForm.startDate}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {console.log("taskForm.startDate:", taskForm.startDate)}
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="dueDate" className="flex items-center">
            <FaRegCalendarAlt className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Fecha de Término:
          </label>
          <input
            type="date"
            name="dueDate"
            value={taskForm.dueDate}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {console.log("taskForm.dueDate:", taskForm.dueDate)}
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="priority" className="flex items-center">
            <FaExclamationCircle className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Prioridad:
          </label>
          <select
            name="priority"
            value={taskForm.priority}
            onChange={handleInputChange}
            className="border rounded p-2 w-full">
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>
          {console.log("taskForm.priority:", taskForm.priority)}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
