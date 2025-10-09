import React from 'react';
import Button from './Button';
import { FaRegEdit } from 'react-icons/fa';
// Componente para el botón de edición de cliente
const EditClientButton = ({ client, handleOpenModal }) => (
	<Button
		id="edit-client-button"
		type="button"
		text="Editar Cliente"
		variant="blue_3"
		onClick={() => handleOpenModal(client)}
		size="md"
		icon={FaRegEdit}
		data-testid="edit-client-button"
	/>
);
// ...existing code...

export default EditClientButton;
