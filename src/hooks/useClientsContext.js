import { useContext } from 'react';
import ClientsContext from '@context/ClientsContext';

export const useClientsContext = () => useContext(ClientsContext);