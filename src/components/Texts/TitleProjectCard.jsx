import React from 'react';

const TitleProjectCard = ({ project }) => {
	return <h2 className="text-xl md:text-2xl font-semibold uppercase">{project.title}</h2>;
};

export default TitleProjectCard;
