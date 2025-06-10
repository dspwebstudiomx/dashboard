import { useState, useEffect } from 'react';

export function useProjectTasks({ clientId, projectId, isOpen = false } = {}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Aquí podrías cargar las tareas si tienes endpoint GET
  }, [clientId, projectId, isOpen]);

  const createTask = async (newTask) => {
    if (!clientId || !projectId) throw new Error('Faltan clientId o projectId');

    // LOGS EXPLÍCITOS PARA DEPURACIÓN
    console.log('--- CREANDO TAREA ---');
    console.log('clientId:', clientId, 'projectId:', projectId);
    console.log('URL:', `http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks`);
    console.log('Payload:', {
      projectId,
      clientId,
      ...newTask,
      taskId: newTask.taskId || Date.now(),
      status: newTask.status || 'Nuevo',
      priority: newTask.priority || 'Baja',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const taskToSend = {
      ...newTask,
      taskId: newTask.taskId || Date.now(),
      clientId,
      projectId,
      status: newTask.status || 'Nuevo',
      priority: newTask.priority || 'Baja',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskToSend),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error en el servidor');
    }
    const data = await res.json();
    setTasks(data.tasks ?? []);
    return data;
  };

  const updateTask = async (taskId, updatedTask) => {
    if (!clientId || !projectId) throw new Error('Faltan clientId o projectId');
    console.log('Actualizando tarea:', { clientId, projectId, taskId, updatedTask });

    const url = `http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks/${taskId}`;
    console.log('URL updateTask:', url);

    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Respuesta error:', text);
      throw new Error('Error en el servidor');
    }
    const data = await res.json();
    setTasks(data.tasks ?? []);
    return data;
  };

  return {
    tasks,
    createTask,
    updateTask,
  };
}