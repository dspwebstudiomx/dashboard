import React, { useEffect } from 'react';
import ClientsCard from './ClientsCard';
import { ClientsModal } from './ClientsModal';
import { useModal } from '@hooks/useModal';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoPersonAddSharp } from 'react-icons/io5';
import { handleScrollToTop, handleScrollToBottom } from '@api/GeneralApi';
import { useClientsContext } from '@hooks/useClientsContext';
import { useSelectedClient } from '@hooks/useSelectedClient';
import axios from 'axios';

const ClientsList = () => {
	const {
		clients,
		setClients,
		handleAddClient,
		editClient,
		setNewClient,
		setEditClientId,
		editClientId,
		resetForm,
		fetchClients,
	} = useClientsContext();

	const { selectedClient, setSelectedClient } = useSelectedClient();
	const { isOpen, openModal, closeModal } = useModal();

	// Cargar clientes desde el archivo JSON solo una vez
	useEffect(() => {
		axios
			.get('/server/clients.json')
			.then((response) => setClients(response.data))
			.catch((error) => console.error('Error al cargar clientes:', error));
	}, [setClients]);

	// Abrir modal para agregar o editar cliente
	const handleOpenModal = (client = null) => {
		setSelectedClient(client);
		setNewClient(client || {});
		setEditClientId(client ? client.id : null);
		openModal();
	};

	// Cerrar modal
	const handleCloseModal = () => {
		setSelectedClient(null);
		resetForm();
		closeModal();
	};

	// Guardar cliente (agregar o editar) y actualizar la lista
	const handleSaveClient = async (client) => {
		if (editClientId) {
			await editClient(editClientId, client);
		} else {
			await handleAddClient({ ...client, id: Date.now(), createdAt: new Date().toISOString() });
		}
		// Recargar la lista desde la API
		if (typeof fetchClients === 'function') {
			await fetchClients();
		}
		handleCloseModal();
	};

	return (
		<section
			id="clients-list-container"
			className="grid grid-cols-12 top-0 w-full relative gap-6 bg-none justify-center items-center  max-w-screen-xl"
		>
			{/* Botones de la barra lateral */}
			<aside
				id="clients-aside-buttons"
				className="fixed bottom-0 left-0 md:left-20 md:right-0  md:top-46 flex md:flex-col md:gap-6 items-start z-20 w-[100vw] md:w-[15vw]"
			>
				{/* Botón editar clientes */}
				{/* Botón agregar clientes */}
				<button
					id="agregar-cliente"
					onClick={() => handleOpenModal()}
					className="text-white px-6 py-4 flex items-center justify-center gap-2 md:rounded-full lg:rounded-lg bg-blue-900 hover:bg-blue-700 transition duration-300 shadow-2xl w-full md:w-[170px] lg:w-[210px]"
					aria-label="Agregar cliente"
				>
					<IoPersonAddSharp size={25} />
					<span className="hidden md:block"> Agregar Cliente</span>
				</button>

				{/* Botón ir arriba */}
				<button
					id="ir-a-inicio"
					onClick={handleScrollToTop}
					className="text-white px-6 py-4 flex items-center justify-center gap-2 md:rounded-full lg:rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-2xl w-full md:w-[160px]  lg:w-[210px]"
					aria-label="Ir a inicio"
				>
					<FaArrowUp size={25} />
					<span className="hidden md:block">Ir a Inicio</span>
				</button>

				{/* Botón ir abajo */}
				<button
					id="ir-al-final"
					onClick={handleScrollToBottom}
					className="text-white px-6 py-4 flex items-center justify-center gap-2 md:rounded-full lg:rounded-lg bg-blue-500 hover:bg-blue-400 transition duration-300 shadow-2xl w-full  md:w-[160px]  lg:w-[210px]"
					aria-label="Ir al final"
				>
					<FaArrowDown size={25} />
					<span className="hidden md:block">Ir al Final</span>
				</button>
			</aside>

			{/* Lista de clientes */}
			<ul
				id="clients-list"
				className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-6 col-span-12 w-full  md:ml-32"
			>
				{clients.map((client) => (
					<ClientsCard
						key={client.id}
						client={client}
						fetchClients={fetchClients}
						handleOpenModal={handleOpenModal}
					/>
				))}
			</ul>

			{/* Modal para agregar o editar cliente */}
			<ClientsModal
				client={selectedClient}
				onClientUpdate={handleSaveClient}
				isOpen={isOpen}
				onClose={handleCloseModal}
			/>
		</section>
	);
};

export default ClientsList;
