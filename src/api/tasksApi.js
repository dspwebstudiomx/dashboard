import axios from "axios";

// Asegúrate de importar o definir estas variables desde el estado global o contexto
let taskForm = {
  title: "",
  description: "",
  startDate: "",
  dueDate: "",
  priority: "Low",
};
let tasks = [];
let selectedClient = null;

const setTaskForm = (newForm) => {
  taskForm = { ...taskForm, ...newForm };
};

const setTasks = (newTasks) => {
  tasks = [...newTasks];
};

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

const fetchTasks = async (clientId) => {
  if (!clientId) {
    alert("El cliente seleccionado no es válido.");
    return [];
  }

  try {
    const response = await axios.get(`/api/clients/${clientId}/tasks`);
    console.log("Tareas obtenidas del servidor:", response.data);
    return response.data; // Suponiendo que el servidor devuelve un array de tareas
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Hubo un error al obtener las tareas.";
    console.error("Error al obtener las tareas:", error);
    alert(`Error del servidor: ${errorMessage}`);
    return [];
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

  // Validar que las fechas sean válidas
  if (!taskForm.startDate || !taskForm.dueDate) {
    alert("Por favor, completa las fechas de inicio y término.");
    return;
  }

  // Validar que la fecha de término sea mayor o igual a la fecha de inicio
  if (new Date(taskForm.dueDate) < new Date(taskForm.startDate)) {
    alert("La fecha de término debe ser mayor o igual a la fecha de inicio.");
    return;
  }

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
};

const handleEditTask = (index) => {
  if (!validateClientSelected()) return;

  // Validar que las fechas sean válidas
  if (!taskForm.startDate || !taskForm.dueDate) {
    alert("Por favor, completa las fechas de inicio y término.");
    return;
  }

  // Validar que la fecha de término sea mayor o igual a la fecha de inicio
  if (new Date(taskForm.dueDate) < new Date(taskForm.startDate)) {
    alert("La fecha de término debe ser mayor o igual a la fecha de inicio.");
    return;
  }

  const updatedTasks = [...tasks];
  updatedTasks[index] = { ...taskForm, clientId: selectedClient };
  setTasks(updatedTasks);

  saveTasksToServer(
    selectedClient,
    updatedTasks.filter((task) => task.clientId === selectedClient)
  );
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

export {
  handleInputChange,
  saveTasksToServer,
  validateClientSelected,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  fetchTasks, // Asegúrate de exportar la nueva función
};
