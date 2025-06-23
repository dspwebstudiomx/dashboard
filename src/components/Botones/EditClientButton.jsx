import React from 'react';
import Button from './Button';
import { FaRegEdit } from 'react-icons/fa';

// Componente para el botón de edición de cliente
const EditClientButton = ({ setIsModalOpen, selectedClient, setSelectedClient }) => {
	// Función para manejar la apertura del modal de edición
	const handleOpenModal = () => {
		if (selectedClient) {
			setSelectedClient(selectedClient); // Asegura que el cliente está seleccionado
			setIsModalOpen(true); // Abre el modal
		}
	};

	return (
		<Button
			id="edit-client-button" //distintivo ID para el botón
			type="button" // Tipo de botón
			text="Editar Cliente" // Texto del botón
			variant="blue_3" // Estilo del botón
			onClick={handleOpenModal} // Llama a la función para abrir el modal
			size="md" // Tamaño del botón
			icon={FaRegEdit} // Icono del botón
			data-testid="edit-client-button" // Añade un test ID para pruebas
		/>
	);
};

export default EditClientButton;
