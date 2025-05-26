import { useState, useEffect } from 'react';

export function useProjectTasks({ clientId, project, isOpen }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskPriority, setTaskPriority] = useState('Baja');
  const [taskStatus, setTaskStatus] = useState('Nuevo');
  const [editTask, setEditTask] = useState(null);

  // Cargar tareas cuando se abre el modal o cambia el proyecto
  useEffect(() => {
    if (!clientId || !project?.id) return;
    if (isOpen) {
      fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`)
        .then((res) => res.json())
        .then((data) => setTasks(data.tasks ?? []));
    }
  }, [isOpen, project, clientId]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!clientId || !project?.id) return;
    const newTask = {
      taskId: Date.now(),
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      clientId: clientId,
    };

    fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage('Tarea creada exitosamente.');
        setTasks(data.tasks ?? []);
        resetTaskForm();
        setShowTaskModal(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const handleDeleteTask = (taskId) => {
    if (!clientId || !project?.id) return;
    fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks ?? []);
        setSuccessMessage('Tarea eliminada exitosamente.');
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const handleEditTaskClick = (task) => {
    setEditTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);
    setShowTaskModal(true);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    if (!clientId || !project?.id || !editTask) return;
    const updatedTask = {
      ...editTask,
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
    };
    fetch(
      `http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${editTask.taskId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage('Tarea editada exitosamente.');
        setTasks(data.tasks ?? []);
        resetTaskForm();
        setShowTaskModal(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const resetTaskForm = () => {
    setEditTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('Baja');
    setTaskStatus('Nuevo');
  };

  return {
    showTaskModal,
    setShowTaskModal,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    successMessage,
    setSuccessMessage,
    tasks,
    setTasks,
    taskPriority,
    setTaskPriority,
    taskStatus,
    setTaskStatus,
    editTask,
    setEditTask,
    handleCreateTask,
    handleDeleteTask,
    handleEditTaskClick,
    handleEditTask,
    resetTaskForm,
  };
}