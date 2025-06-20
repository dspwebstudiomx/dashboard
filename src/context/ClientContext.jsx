import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
	const [selectedClient, setSelectedClient] = useState(null);
	const [isProyectExist, setIsProyectExist] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

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
