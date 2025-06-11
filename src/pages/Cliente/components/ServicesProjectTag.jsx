import React from 'react';

const ServicesProjectTag = ({ project }) => {
	return (
		<div id="servicios" className="flex flex-col gap-2">
			{/* <h4 className="text-lg font-semibold">Servicios:</h4> */}
			{Array.isArray(project.services) && project.services.length > 0 ? (
				<ul className="flex flex-wrap gap-2 mt-4">
					{project.services.map((service, index) => {
						const blueShades = [
							'bg-blue-400 border-blue-500',
							'bg-blue-500 border-blue-600',
							'bg-blue-600 border-blue-700',
							'bg-blue-700 border-blue-800',
							'bg-blue-800 border-blue-900',
							'bg-blue-900 border-blue-800',
						];
						const shade = blueShades[index % blueShades.length];
						return (
							<li
								key={index}
								className={`dark:text-gray-100 text-gray-100 font-semibold py-1 px-4 rounded-full mr-2 mb-2 border-2 ${shade}`}
							>
								{service}
							</li>
						);
					})}
				</ul>
			) : (
				<span className="bg-blue-100 text-blue-500 font-semibold py-1 px-4 rounded-full mt-4 w-fit border-2 border-blue-500">
					No solicitados
				</span>
			)}
		</div>
	);
};

export default ServicesProjectTag;
