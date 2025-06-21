import React from 'react';
import ClientsContext from './ClientsContext';
import { useClients } from '@hooks/useClients';

export const ClientsProvider = ({ children }) => {
	const clientsHook = useClients();
	return <ClientsContext.Provider value={clientsHook}>{children}</ClientsContext.Provider>;
};
