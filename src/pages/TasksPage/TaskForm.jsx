/*
  TaskForm.jsx - Componente para el formulario de tareas.
  Este componente permite agregar o editar tareas, y muestra un formulario con los campos necesarios.
  Utiliza el estado local para manejar los datos del formulario y la selección de clientes.
  También carga la lista de clientes desde un archivo JSON utilizando axios.
  Creador : Daniel Pérez
  Fecha de creación : 2025-05-07
*/

// Importaciones necesarias
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaTasks,
  FaRegCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

// Estructura del componente
const TaskForm = ({
  selectedClient,
  setSelectedClient,
  taskForm,
  handleInputChange,
  handleAddTask,
}) => {
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes

  useEffect(() => {
    // Carga los clientes desde el archivo JSON usando axios
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    // Llama a la función para cargar los clientes
    fetchClients();
  }, []);

  return (
    <form id="formulario-tareas" className="mb-6 xl:p-12 py-0">
      {/* Título dinámico */}
      <h2 className="text-xl font-semibold mb-2 text-center py-6">
        {taskForm.id ? (
          <div className="flex items-center gap-4 justify-center">
            <BsFillPersonLinesFill className="text-blue-900 text-4xl" />
            Editar Tarea
          </div>
        ) : (
          <div className="flex items-center gap-4 justify-center">
            <IoMdPersonAdd className="text-blue-900 text-4xl" />
            Agregar Tarea
          </div>
        )}
      </h2>
      {/* Contenedor de campos de formulario */}
      <div
        id="campos-tareas"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white">
        {/* Seleccionar de cliente */}
        <div id="seleccionar-cliente" className="flex flex-col gap-5">
          <label htmlFor="selectedClient" className="flex items-center">
            <FaUser className="inline mr-2 text-blue-900 text-2xl" />{" "}
            Seleccionar cliente:
          </label>
          <select
            className="border rounded p-2 w-full"
            value={selectedClient}
            onChange={(e) => {
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

        {/* Título de la tarea */}
        <div id="titulo-tarea" className="flex flex-col gap-5">
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
        </div>

        {/* Descripción de la tarea */}
        <div id="descripcion-tarea" className="flex flex-col gap-5">
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
        </div>

        {/* Fecha de inicio de la tarea */}
        <div id="fecha-inicio-tarea" className="flex flex-col gap-5">
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
        </div>

        {/* Fecha de la terminación de la tarea */}
        <div id="fecha-terminacion-tarea" className="flex flex-col gap-5">
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
        </div>

        {/* Prioridad */}
        <div id="prioridad-tarea" className="flex flex-col gap-5">
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
        </div>
      </div>

      {/* Botón para agregar o guardar la tarea */}
      <div id="contenedor-botones-tarea" className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-4 rounded-xl border-4 border-blue-300 w-[320px] text-xl mt-12 text-center">
          {taskForm.id ? "Guardar Cambios" : "Agregar Tarea"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
