import { useContext } from 'react';
import ClientContext from '../context/ClientContext';

export const useSelectedClient = () => {
  return useContext(ClientContext);
};