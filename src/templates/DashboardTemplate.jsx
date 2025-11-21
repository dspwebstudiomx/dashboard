import React from 'react';
import Header from '@components/Menus/Header';
import Sidebar from '@components/Menus/Sidebar';
import Section from '@components/Section';

/**
 * Componente principal de la plantilla del dashboard.
 * Renderiza el encabezado, el sidebar y el contenido principal.
 *
 * @param {React.ReactNode} children - Contenido principal que se renderiza en el dashboard.
 */
const DashboardTemplate = ({ children }) => {
	return (
		<div className="w-full p-8 mt-24">
			{/* Contenido principal */}
			{children}
		</div>
	);
};

export default DashboardTemplate;
