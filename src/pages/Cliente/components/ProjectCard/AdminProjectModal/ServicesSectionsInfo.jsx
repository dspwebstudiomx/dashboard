import React from 'react';
import ServicesProjectTag from '../../ServicesProjectTag';
import SectionsProjectTag from '../../SectionsProjectTag';

const ServicesSectionsInfo = ({ project }) => {
	return (
		<div className="flex flex-col md:flex-col gap-12 py-12">
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold sticky">Servicios Requeridos</h2>
				<span className="ml-4">
					<ServicesProjectTag project={project} />
				</span>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
				<span className="ml-4">
					<SectionsProjectTag project={project} />
				</span>
			</div>
		</div>
	);
};

export default ServicesSectionsInfo;
