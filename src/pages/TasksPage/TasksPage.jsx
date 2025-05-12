import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchClients } from "@api/clientsApi";
import DashboardTemplate from "@templates/DashboardTemplate";
import TaskForm from "./TaskForm";
import { IoMdClose } from "react-icons/io";

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
        console.log("Clientes recibidos:", response.data); // Agrega este log
        setClients(response.data); // Asegúrate de que response.data sea un array
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  useEffect(() => {
    if (selectedClient) {
      console.log("Cliente seleccionado:", selectedClient);
      axios
        .get(`http://localhost:5000/api/clients/${selectedClient}`)
        .then((response) => {
          console.log("Tareas recibidas:", response.data.tasks);
          setTasks(response.data.tasks || []);
        })
        .catch((error) => {
          console.error("Error al cargar las tareas del cliente:", error);
          alert("No se pudieron cargar las tareas. Intenta nuevamente.");
        });
    }
  }, [selectedClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const saveTasksToServer = async (clientId, updatedTasks) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/clients/${clientId}`,
        { tasks: updatedTasks }
      );

      if (response.status === 200) {
        console.log("Tareas guardadas en el servidor correctamente.");
        // Recarga las tareas desde el servidor
        const updatedClient = await axios.get(
          `http://localhost:5000/api/clients/${clientId}`
        );
        setTasks(updatedClient.data.tasks || []);
      } else {
        console.error("Error al guardar las tareas en el servidor:", response);
        alert("No se pudieron guardar las tareas. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al guardar las tareas en el servidor:", error);
      alert("No se pudieron guardar las tareas. Intenta nuevamente.");
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

    const newTask = { id: Date.now(), ...taskForm, clientId: selectedClient };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks); // Actualiza el estado local

    // Guarda las tareas en el servidor
    saveTasksToServer(selectedClient, updatedTasks);

    // Reinicia el formulario
    setTaskForm({
      clientId: selectedClient,
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "Low",
    });

    setIsModalOpen(false); // Cierra el modal
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
      <div className="bg-white dark:bg-gray-800 rounded-xl min-h-[70vh] p-12">
        <div className="flex mb-4 w-full items-start justify-between">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Administración de Tareas
          </h1>

          {/* Botón para abrir el modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer">
            Agregar Tarea
          </button>
        </div>

        {/* Listado de tareas */}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-800 dark:bg-gray-700 text-gray-100">
                <th className="border border-gray-300 px-4 py-2">Título</th>
                <th className="border border-gray-300 px-4 py-2">
                  Descripción
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Fecha de Inicio
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Fecha de Vencimiento
                </th>
                <th className="border border-gray-300 px-4 py-2">Prioridad</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {task.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {task.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {task.startDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {task.dueDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {task.priority}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => {
                          setTaskForm(task);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No hay tareas disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 md:py-8 w-auto max-h-screen overflow-y-auto">
            <div className="flex justify-end items-center px-4 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer">
                <IoMdClose className="text-blue-900 font-bold mb-4 text-4xl mr-0 mt-6 md:mt-0" />
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
      {console.log("Tareas actuales:", tasks)}
      {console.log("Formulario de tarea:", taskForm)}
    </DashboardTemplate>
  );
};

export default TasksPage;
