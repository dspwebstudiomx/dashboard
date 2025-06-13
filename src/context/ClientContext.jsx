import React, { createContext, useState } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
	const [selectedClient, setSelectedClient] = useState(null);
	const [isProyectExist, setIsProyectExist] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [navigate, setNavigate] = useState(() => () => {});

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
				setNavigate,
			}}
		>
			{children}
		</ClientContext.Provider>
	);
};

export default ClientContext;
