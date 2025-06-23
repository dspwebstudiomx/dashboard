import React from 'react';
import Button from './Button';
import { FaRegEdit } from 'react-icons/fa';
import { useClients } from '../../hooks/useClients';

const EditClientButton = () => {
	const { handleEditClient } = useClients();

	return (
		<Button
			id="edit-client-button"
			type="button"
			text="Editar Cliente"
			variant="blue_2"
			onClick={handleEditClient}
			size="md"
			icon={FaRegEdit}
			data-testid="edit-client-button"
		/>
	);
};

export default EditClientButton;
