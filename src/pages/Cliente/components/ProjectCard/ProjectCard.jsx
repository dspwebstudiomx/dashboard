import React from 'react';
import { useClientContext } from '../@context/ClientContext';

const ProjectCard = ({ project }) => {
	const { selectedClient } = useClientContext();

	if (!selectedClient) {
		return null; // No renderiza nada si no hay cliente seleccionado
	}

	return (
		<div className="project-card">
			<h3>{project.name}</h3>
			<p>
				<strong>Estado:</strong> {project.status}
			</p>
			<p>
				<strong>Cliente:</strong> {selectedClient.fullName}
			</p>
		</div>
	);
};

export default ProjectCard;
