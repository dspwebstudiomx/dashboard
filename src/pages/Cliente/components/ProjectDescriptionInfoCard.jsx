import React from 'react';

const ProjectDescriptionInfoCard = ({
	project,
	isLongDescription,
	shortDescription,
	showFullDescription, // Corregido
	setShowFullDescription, // Corregido
}) => {
	return (
		<div>
			<p style={{ whiteSpace: 'pre-line' }}>
				{showFullDescription || !isLongDescription ? project.description : shortDescription}
			</p>

			{isLongDescription && (
				<button
					className="text-blue-600 dark:text-blue-500 ml-2 mt-4 font-semibold"
					onClick={() => setShowFullDescription((prev) => !prev)} // Corregido
					type="button"
				>
					{showFullDescription ? 'Ver menos' : 'Ver más'}
				</button>
			)}
		</div>
	);
};

export default ProjectDescriptionInfoCard;
