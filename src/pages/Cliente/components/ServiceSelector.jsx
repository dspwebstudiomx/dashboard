import React from 'react';
import Button from '@components/Botones/Button';
import { FaLayerGroup } from 'react-icons/fa6';

const ServiceSelector = ({ SERVICES, SERVICE_COSTS, project, setProject }) => {
	return (
		<div className="flex flex-col gap-8">
			<label className="text-xl text-gray-800 dark:text-gray-700 flex items-center gap-2 font-semibold">
				<FaLayerGroup className="text-blue-700" />
				Tipo de Servicio
			</label>
			<div className="grid md:grid-cols-3 gap-4 md:ml-6 relative pb-12">
				{SERVICES.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })).map(
					(service) => (
						<label key={service} className="flex items-center gap-2">
							<input
								className="w-6 h-6 rounded-2xl border-2 hover:border-blue-600  border-blue-600 active:border-blue-600 focus:border-blue-700 caret-blue-600"
								type="checkbox"
								name="services"
								value={service}
								checked={
									Array.isArray(project.services) ? project.services.includes(service) : false
								}
								onChange={(e) => {
									const checked = e.target.checked;
									setProject((prev) => {
										const prevServices = Array.isArray(prev.services) ? prev.services : [];
										if (checked) {
											return { ...prev, services: [...prevServices, service] };
										} else {
											return { ...prev, services: prevServices.filter((s) => s !== service) };
										}
									});
								}}
							/>
							<span>
								{service}{' '}
								<span className="text-xs text-gray-500">
									(${SERVICE_COSTS && SERVICE_COSTS[service] ? SERVICE_COSTS[service] : 0})
								</span>
							</span>
						</label>
					)
				)}

				<div className="flex items-center gap-2 col-span-full md:col-span-3">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="w-6 h-6 rounded-2xl"
							name="services"
							value="Otro"
							checked={Array.isArray(project.services) ? project.services.includes('Otro') : false}
							onChange={(e) => {
								const checked = e.target.checked;
								setProject((prev) => {
									const prevServices = Array.isArray(prev.services) ? prev.services : [];
									if (checked) {
										return { ...prev, services: [...prevServices, 'Otro'] };
									} else {
										return {
											...prev,
											services: prevServices.filter((s) => s !== 'Otro'),
											otherServiceAmount: 0,
										};
									}
								});
							}}
						/>
						<span>Otro</span>
					</label>
					{Array.isArray(project.services) && project.services.includes('Otro') && (
						<input
							type="number"
							min="0"
							step="0.01"
							className="p-2 rounded border-2 hover:border-blue-600  border-blue-600 active:border-blue-600 focus:border-blue-700 caret-blue-600 w-40"
							value={project.otherServiceAmount || 0}
							onChange={(e) =>
								setProject((prev) => ({ ...prev, otherServiceAmount: Number(e.target.value) }))
							}
						/>
					)}

					{/* Botón movido a posición absoluta en la esquina inferior derecha */}
				</div>

				{Array.isArray(project.services) && project.services.length > 0 && (
					<div className="absolute right-0 bottom-0 p-2">
						<Button
							variant="primary"
							onClick={() => setProject((prev) => ({ ...prev, services: [] }))}
							type="button"
							text="Limpiar"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ServiceSelector;
