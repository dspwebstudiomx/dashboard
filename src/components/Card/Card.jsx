import React from 'react';

const Card = ({ children }) => {
	return (
		<div className="flex flex-col place-content-center rounded-lg border-2 border-blue-300 dark:border-gray-700">
			{children}
		</div>
	);
};

export default Card;
