import React from 'react';
import { useClientContext } from '../@context/ClientContext';

const AdminActionButton = ({ action, label }) => {
	const { selectedClient } = useClientContext();

	const handleClick = () => {
		if (!selectedClient) {
			alert('No hay un cliente seleccionado.');
			return;
		}

		action(selectedClient.id);
	};

	return (
		<button onClick={handleClick} className="admin-action-button">
			{label}
		</button>
	);
};

export default AdminActionButton;
