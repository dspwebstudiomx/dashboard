import React from 'react';

const CostsProjectList = ({ costs }) => {
	return (
		<ul>
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
			<li>
				Pago Neto:{' '}
				{costs.netPayable
					.toFixed(2)
					.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
			</li>
		</ul>
	);
};

export default CostsProjectList;
