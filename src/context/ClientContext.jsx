import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
	const [selectedClient, setSelectedClient] = useState(null);
	const [isProyectExist, setIsProyectExist] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	const fetchClientById = async (id) => {
		const response = await fetch(`http://localhost:5000/api/clients/${id}`);
		if (!response.ok) return null;
		return await response.json();
	};

	useEffect(() => {
		if (id) {
			console.log("Buscando cliente con id:", id);
			fetchClientById(id).then((client) => {
				console.log("Cliente encontrado:", client);
				setSelectedClient(client);
				setIsProyectExist(client?.projects?.length > 0);
			});
		}
	}, [id]);

	return (
		<ClientContext.Provider
			value={{
				selectedClient,
				setSelectedClient,
				isProyectExist,
				setIsProyectExist,
				isModalOpen,
				setIsModalOpen,
				navigate,
			}}
		>
			{children}
		</ClientContext.Provider>
	);
};

export default ClientContext;
