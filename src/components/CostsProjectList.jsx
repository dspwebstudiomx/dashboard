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
				Tarifa Base: $
				{costs.baseRate.toFixed(2).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
			</li>
			<li>
				IVA 16%:{' '}
				{costs.ivaTax.toFixed(2).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
			</li>
			<li>
				Subtotal + IVA:{' '}
				{costs.subtotal.toFixed(2).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
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
