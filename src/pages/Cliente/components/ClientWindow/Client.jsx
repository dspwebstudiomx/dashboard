import CloseButton from '@components/Botones/CloseButton';
import DashboardTemplate from '@templates/DashboardTemplate';
import ClientHeader from './ClientHeader';
import ClientInfo from './ClientInfo';
import ClientProjects from './ClientProjects';
import { useSelectedClient } from '@hooks/useSelectedClient';

const Client = () => {
	const {
		selectedClient,
		setSelectedClient,
		isProyectExist,
		setIsProyectExist,
		isModalOpen,
		setIsModalOpen,
		navigate,
	} = useSelectedClient();

	return (
		<>
			<DashboardTemplate title="Detalles del Cliente">
				{selectedClient ? (
					<section className="flex flex-col gap-18 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-16 xl:p-20 border-2 dark:border-gray-700 border-gray-300 ">
						<article>
							<div className="flex items-center justify-end">
								<CloseButton onClick={() => navigate(-1)} />
							</div>
							<ClientHeader
								selectedClient={selectedClient}
								setIsModalOpen={setIsModalOpen}
								isModalOpen={isModalOpen}
								setSelectedClient={setSelectedClient}
							/>
							<ClientInfo selectedClient={selectedClient} />
							<ClientProjects
								isProyectExist={isProyectExist}
								selectedClient={selectedClient}
								onUpdateProjects={(updatedProjects) => {
									setSelectedClient((prev) => {
										if (!prev) return prev;
										const projects = updatedProjects || [];
										return { ...prev, projects };
									});
									setIsProyectExist(updatedProjects.length > 0);
								}}
							/>
						</article>
					</section>
				) : (
					<p>Cargando cliente...</p>
				)}
			</DashboardTemplate>
		</>
	);
};

export default Client;
