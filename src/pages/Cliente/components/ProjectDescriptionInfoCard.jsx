import React from 'react';

const ProjectDescriptionInfoCard = ({
	project,
	isLongDescription,
	shortDescription,
	showFullDescriptionription,
	setshowFullDescriptionription,
}) => {
	return (
		<div>
			<p style={{ whiteSpace: 'pre-line' }}>
				{showFullDescriptionription || !isLongDescription ? project.description : shortDescription}
			</p>

			{isLongDescription && (
				<button
					className="text-blue-600 dark:text-blue-500 ml-2 mt-4 font-semibold"
					onClick={() => setshowFullDescriptionription((prev) => !prev)}
					type="button"
				>
					{showFullDescriptionription ? 'Ver menos' : 'Ver más...'}
				</button>
			)}
		</div>
	);
};

export default ProjectDescriptionInfoCard;
