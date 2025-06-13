import React from 'react';

const TotalCostProyectCard = ({ netPayable }) => {
	const isValidNetPayable = typeof netPayable === 'number' && !isNaN(netPayable);

	return (
		<>
			{/* Costo total */}
			<p className=" text-gray-700 dark:text-gray-100 font-semibold mt-2">
				Total del proyecto:{' '}
				<span className="text-blue-900 dark:text-blue-400 text-xl">
					{isValidNetPayable ? `$${netPayable.toLocaleString('es-MX')}` : 'No disponible'}
				</span>
			</p>
		</>
	);
};

export default TotalCostProyectCard;
