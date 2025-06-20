import ClientContext from '@context/ClientContext';
import { useContext } from 'react';


export const useSelectedClient = () => {
  return useContext(ClientContext);
};