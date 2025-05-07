import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchClients } from "@api/clientsApi";
import DashboardTemplate from "@templates/DashboardTemplate";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { IoMdClose, IoMdExit } from "react-icons/io";

const TasksPage = () => {
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [taskForm, setTaskForm] = useState({
    id: "",
    clientId: "",
    name: "",
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
    if (!clientId || clientId.trim() === "") {
      alert("El cliente seleccionado no es válido.");
      return;
    }

    console.log("Intentando guardar tareas para el cliente:", clientId);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/clients/${clientId}/tasks`,
        { tasks: updatedTasks }
      );

      alert("Tareas guardadas exitosamente.");
      console.log("Respuesta del servidor:", response.data);
      console.log("Datos enviados al servidor:", updatedTasks);
    } catch (error) {
      console.error("Error al guardar las tareas:", error);

      if (error.response) {
        console.error("Datos del error:", error.response.data);
        console.error("Estado del error:", error.response.status);
        console.error("Encabezados del error:", error.response.headers);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }

      alert(
        `Error del servidor: ${
          error.response?.data?.message || error.message
        }. Verifica el ID del cliente y la URL.`
      );
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
      clientId: selectedClient,
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
          client={
            clients?.find((client) => client.id === selectedClient) || null
          } // Verifica si clients está definido
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={(index) => {
            setTaskForm(tasks[index]);
            setIsModalOpen(true); // Abre el modal para editar la tarea
          }}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 md:py-8 w-auto max-h-screen overflow-y-auto">
            <div className="flex justify-end items-center px-4 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer">
                <IoMdClose className="text-blue-900 font-bold mb-4 text-4xl mr-0" />
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
