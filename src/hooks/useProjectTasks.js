import { useState, useEffect } from 'react';

export function useProjectTasks({ selectedClient = null, project = {} } = {}) {
  const clientId = selectedClient?.clientId || project?.clientId || '';

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskPriority, setTaskPriority] = useState('Baja');
  const [taskStatus, setTaskStatus] = useState('Nuevo');
  const [editTask, setEditTask] = useState(null);

  // Cargar tareas del proyecto actual cada vez que cambie el proyecto o se abra el modal
  useEffect(() => {
    if (project?.tasks) {
      setTasks(project.tasks);
    }
  }, [project]);

  const handleCreateTask = (newTask) => {
    if (!clientId || !project?.id) {
      setSuccessMessage('Faltan clientId o project.id');
      return Promise.reject(new Error('Faltan clientId o project.id'));
    }
    const taskToSend = {
      ...newTask,
      taskId: newTask.taskId || Date.now(),
      clientId: clientId,
      clientFullName: selectedClient?.fullName || '',
      projectId: project.id,
      status: newTask.status || 'Nuevo',
      priority: newTask.priority || 'Baja',
    };

    return fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskToSend),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Error en el servidor'); });
        }
        return res.json();
      })
      .then((data) => {
        setSuccessMessage('Tarea creada exitosamente.');
        setTasks(data.tasks ?? []);
        if (project && data.tasks) {
          project.tasks = data.tasks;
        }
        resetTaskForm();
        setShowTaskModal(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((err) => {
        setSuccessMessage(`Error: ${err.message}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const handleDeleteTask = (taskId) => {
    if (!clientId || !project?.id) return;
    fetch(`http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Error al eliminar tarea'); });
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks ?? []);
        if (project && data.tasks) {
          project.tasks = data.tasks;
        }
        setSuccessMessage('Tarea eliminada exitosamente.');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((err) => {
        setSuccessMessage(`Error: ${err.message}`);
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

  const addHistoryEntry = (task, updatedFields, user = 'Usuario') => {
    const now = new Date();
    const changes = Object.keys(updatedFields).reduce((acc, key) => {
      if (task[key] !== updatedFields[key]) {
        acc[key] = { from: task[key], to: updatedFields[key] };
      }
      return acc;
    }, {});
    if (Object.keys(changes).length === 0) return task.history || [];
    return [
      ...(task.history || []),
      {
        date: now.toISOString(),
        user,
        changes,
      },
    ];
  };

  // Modifica updateTask para agregar historial
  const updateTask = (taskId, updatedTask) => {
    if (!clientId || !project?.id) return;
    const originalTask = tasks.find(t => t.taskId === taskId);
    const history = addHistoryEntry(originalTask, updatedTask);

    fetch(
      `http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${taskId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedTask, history }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Error al actualizar tarea'); });
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks ?? []);
        if (project && data.tasks) {
          project.tasks = data.tasks;
        }
        setSuccessMessage('Tarea actualizada exitosamente.');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((err) => {
        setSuccessMessage(`Error: ${err.message}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  // Modifica handleEditTask para agregar historial
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
    const history = addHistoryEntry(editTask, updatedTask);

    fetch(
      `http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks/${editTask.taskId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedTask, history }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage('Tarea editada exitosamente.');
        setTasks(data.tasks ?? []);
        if (project && data.tasks) {
          project.tasks = data.tasks;
        }
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
    createTask: handleCreateTask,
    handleDeleteTask,
    handleEditTaskClick,
    handleEditTask,
    resetTaskForm,
    updateTask
  };
}