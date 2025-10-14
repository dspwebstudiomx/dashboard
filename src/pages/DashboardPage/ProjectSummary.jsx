import React, { useEffect, useState } from 'react';

const ProjectSummary = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Cambia la URL por la de tu endpoint real
		fetch('/api/clients/all')
			.then((res) => res.json())
			.then((data) => {
				// Extraer todos los proyectos de todos los clientes
				const allProjects = data.flatMap((client) => {
					if (!client.projects) return [];
					return client.projects.map((project) => {
						// Calcular el avance
						let progress = 0;
						if (project.totalProgress && !isNaN(project.totalProgress)) {
							progress = Number(project.totalProgress);
						} else if (project.tasks && project.tasks.length > 0) {
							// Promedio del progreso de las tareas
							const total = project.tasks.reduce((acc, t) => acc + (t.totalProgress || 0), 0);
							progress = Math.round(total / project.tasks.length);
						}
						return {
							name: project.title,
							progress,
						};
					});
				});
				setProjects(allProjects);
			});
	}, []);

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white rounded-lg shadow">
				<thead>
					<tr className="bg-gray-100">
						<th className="py-2 px-4 text-left">Proyecto</th>
						<th className="py-2 px-4 text-left">Avance</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project, index) => (
						<tr key={index} className="border-b">
							<td className="py-2 px-4 font-medium">{project.name}</td>
							<td className="py-2 px-4">
								<div className="flex items-center gap-2">
									<div className="w-40 bg-gray-200 rounded-full h-4">
										<div
											className="bg-blue-500 h-4 rounded-full"
											style={{ width: `${project.progress}%` }}
										></div>
									</div>
									<span className="font-semibold text-gray-700">{project.progress}%</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectSummary;
