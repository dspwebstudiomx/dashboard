import React from 'react';
import { useProjectTasks } from '@hooks/useProjectTasks';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({ selectedClient, clientId, project, isOpen }) => {
	const { tasks, handleCreateTask, handleDeleteTask, handleEditTaskClick } = useProjectTasks({
		selectedClient,
		project,
		isOpen,
	});

	console.log('Proyecto recibido:', project);
	console.log('Tareas del proyecto:', project?.tasks);
	console.log('Tareas del hook:', tasks);
	console.log('selectedClient:', selectedClient);
	console.log('project.clientId:', project?.clientId);
	console.log('Cliente seleccionado:', selectedClient?.id || project?.clientId);

	// Mostrar el clientId de cada tarea si existe
	if (Array.isArray(tasks)) {
		tasks.forEach((task, idx) => {
			console.log(`Tarea ${idx + 1} - clientId:`, task.clientId);
		});
	}

	return (
		<ProjectTasksTable
			tasks={tasks}
			selectedClient={selectedClient}
			clientId={clientId}
			project={project}
			onCreateTask={handleCreateTask}
			onDeleteTask={handleDeleteTask}
			onEditTaskClick={handleEditTaskClick}
			isOpen={isOpen}
			projectId={project.id}
			projectTitle={project.title}
			projectDescription={project.description}
			projectPriority={project.priority}
			projectStatus={project.status}
			projectSections={project.sections}
			projectServices={project.services}
			projectTasks={project.tasks}
			projectClient={project.client}
			projectClientId={project.clientId}
			projectCreatedAt={project.createdAt}
			projectUpdatedAt={project.updatedAt}
		/>
	);
};

export default ProjectTasks;
