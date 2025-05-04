import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchClients } from "@api/clientsApi";
import DashboardTemplate from "@templates/DashboardTemplate";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { IoMdExit } from "react-icons/io";

const TasksPage = () => {
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    priority: "Low",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    fetchClients()
      .then((response) => {
        setClients(response.data); // Assuming response.data contains the clients array
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const saveTasksToServer = async (clientId, updatedTasks) => {
    if (!clientId) {
      alert("El cliente seleccionado no es válido.");
      return;
    }

    try {
      const response = await axios.post(`/api/clients/${clientId}/tasks`, {
        tasks: updatedTasks,
      });
      alert("Tareas guardadas exitosamente.");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Hubo un error al guardar las tareas.";
      console.error("Error al guardar las tareas:", error);
      alert(`Error del servidor: ${errorMessage}`);
    }
  };

  const validateClientSelected = () => {
    if (!selectedClient) {
      alert("Por favor, selecciona un cliente.");
      return false;
    }
    return true;
  };

  const handleAddTask = () => {
    if (!validateClientSelected()) return;

    const newTask = { ...taskForm, clientId: selectedClient };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    saveTasksToServer(
      selectedClient,
      updatedTasks.filter((task) => task.clientId === selectedClient)
    );

    setTaskForm({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "Low",
    });

    setIsModalOpen(false); // Cierra el modal después de agregar la tarea
  };

  const handleEditTask = (index) => {
    if (!validateClientSelected()) return;

    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...taskForm, clientId: selectedClient };
    setTasks(updatedTasks);

    saveTasksToServer(
      selectedClient,
      updatedTasks.filter((task) => task.clientId === selectedClient)
    );

    setIsModalOpen(false); // Cierra el modal después de editar la tarea
  };

  const handleDeleteTask = (index) => {
    if (!validateClientSelected()) return;

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    saveTasksToServer(
      selectedClient,
      updatedTasks.filter((task) => task.clientId === selectedClient)
    );
  };

  return (
    <DashboardTemplate>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Administración de Tareas</h1>

        {/* Botón para abrir el modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer">
          Agregar Tarea
        </button>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg py-8 w-1/3">
            <div className="flex justify-end items-center px-4 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer">
                <IoMdExit className="text-red-500 font-bold mb-10 text-4xl mr-6" />
              </button>
            </div>
            <TaskForm
              clients={clients}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              taskForm={taskForm}
              handleInputChange={handleInputChange}
              handleAddTask={handleAddTask}
              handleEditTask={handleEditTask}
            />
          </div>
        </div>
      )}
    </DashboardTemplate>
  );
};

export default TasksPage;
