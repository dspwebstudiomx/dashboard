import React from 'react';
import Button from './Button';
import { FaRegEdit } from 'react-icons/fa';
// Componente para el botón de edición de cliente
const EditClientButton = ({ client, handleOpenModal, selectedClient }) => (
	<Button
		id="edit-client-button"
		type="button"
		text="Editar Cliente"
		variant="blue_3"
		onClick={() => handleOpenModal(client || selectedClient)}
		size="md"
		icon={FaRegEdit}
		data-testid="edit-client-button"
	/>
);
// ...existing code...

export default EditClientButton;
