import React from 'react';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({ project, clientId, actions }) => {
	return (
		<>
			<h2 className="text-2xl font-semibold text-center uppercase mt-12">Tareas</h2>
			<ProjectTasksTable project={project} clientId={clientId} actions={actions} />
		</>
	);
};

export default ProjectTasks;
