import React from 'react';

const CostsProjectList = ({ costs }) => {
	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm">
			<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 text-left mb-8">
				Resumen de Costos
			</h2>
			<ul className="mr-12 flex flex-col gap-4 text-lg ml-4 font-medium">
				<li>
					Total de Servicios:{'   '}
					{costs.totalServices
						.toFixed(2)
						.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
				</li>
				<li>
					Total de Secciones:{' '}
					{costs.totalSections
						.toFixed(2)
						.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
				</li>
				<li>
					Tarifa Base:{' '}
					{Number(costs.baseRate).toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</li>
				<li>
					IVA 16%:{' '}
					{Number(costs.ivaTax).toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</li>
				<li>
					Subtotal + IVA:{' '}
					{Number(costs.subtotal).toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</li>
				<li>
					Retención de IVA:{' '}
					{costs.ivaRetention
						.toFixed(2)
						.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
				</li>
				<li>
					Retención de ISR:{' '}
					{costs.isrRetention
						.toFixed(2)
						.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
				</li>
				<li className="font-bold mt-6">
					Pago Neto:{' '}
					{costs.netPayable
						.toFixed(2)
						.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
				</li>
			</ul>
		</div>
	);
};

export default CostsProjectList;
