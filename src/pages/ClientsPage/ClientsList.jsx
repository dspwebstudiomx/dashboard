import React, { useEffect } from 'react';
import ClientsCard from './ClientsCard';
import { ClientsModal } from './ClientsModal';
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
		showModal,
		setShowModal,
		addClient,
		editClient,
		removeClient,
		setNewClient,
		setEditClientId,
		editClientId,
		resetForm,
	} = useClientsContext();

	const { selectedClient, setSelectedClient } = useSelectedClient();

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
		setShowModal(true);
	};

	// Cerrar modal
	const handleCloseModal = () => {
		setSelectedClient(null);
		resetForm();
		setShowModal(false);
	};

	// Guardar cliente (agregar o editar)
	const handleSaveClient = (client) => {
		if (editClientId) {
			editClient(editClientId, client);
		} else {
			addClient({ ...client, id: Date.now(), createdAt: new Date().toISOString() });
		}
		handleCloseModal();
	};

	const modal = {
		isOpen: showModal,
		openModal: () => setShowModal(true),
		closeModal: handleCloseModal,
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
				className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-6 col-span-12 w-full  md:ml-20 2xl:pr-0"
			>
				{clients.map((client) => (
					<ClientsCard
						key={client.id}
						client={client}
						handleEditClient={() => handleOpenModal(client)}
						handleDeleteClient={() => removeClient(client.id)}
						onClose={handleCloseModal}
					/>
				))}
			</ul>

			{/* Modal para agregar o editar cliente */}
			{showModal && (
				<ClientsModal
					client={selectedClient}
					onClientUpdate={handleSaveClient}
					modal={modal}
				/>
			)}
		</section>
	);
};

export default ClientsList;
