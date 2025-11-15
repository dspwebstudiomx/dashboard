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
const DashboardTemplate = ({ children, title }) => {
	return (
		<div className="w-full flex flex-col bg-blue-900 dark:bg-gray-900">
			{/* Encabezado */}
			<Header title={title} />

			{/* Sidebar siempre visible en el lado derecho */}
			<div className="fixed top-0 right-20 h-full">
				<Sidebar isOpen={true} />
			</div>

			{/* Contenido principal */}
			<main
				className={`grid grid-cols-12 p-0 pt-32 md:mt-8 lg:mt-6 xl:mt-20 items-start justify-center 2xl:px-0 2xl:pl-0 2xl:py-10 min-h-[84.8vh] dark:bg-gray-900 text-gray-800 dark:text-gray-100 mx-auto`}
			>
				{/* Contenido principal */}
				<Section className="p-8 md:p-12" columns="col-span-12 md:col-span-10">
					{children}
				</Section>
			</main>
			<footer>
				<div className="flex justify-center items-center py-8">
					<p className="text-gray-100 dark:text-gray-400 text-sm px-12 md:px-0">
						&copy; {new Date().getFullYear()} dspwebstudio. Todos los derechos reservados.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default DashboardTemplate;
