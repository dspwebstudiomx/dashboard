import React from 'react';

const Priority = ({ project }) => {
	return (
		<span
			className={`text-lg font-medium py-1 px-6  rounded-full h-auto w-[75%] md:w-22 md:text-base flex items-center justify-center ${
				project.priority === 'Alta'
					? 'bg-red-400 text-gray-100 border-2 border-red-500'
					: project.priority === 'Media'
					? 'bg-yellow-400 text-gray-100 border-2 border-yellow-500'
					: 'bg-green-500 text-gray-100 border-2 border-green-600'
			}`}
		>
			{project.priority}
		</span>
	);
};

export default Priority;
