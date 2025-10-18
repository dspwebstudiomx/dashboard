import Button from '@components/Botones/Button';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const DeleteActionButton = ({ onClick, text }) => {
	return (
		<Button
			variant="blue_3"
			text={text || 'Eliminar'}
			icon={FaRegTrashAlt}
			onClick={onClick}
			type="button"
			size="md"
		/>
	);
};

export default DeleteActionButton;
