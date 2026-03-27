import Button from '@components/Botones/Button';
import React from 'react';
import { LuPencil } from 'react-icons/lu';

const EditActionButton = ({ onClick, text, disabled }) => {
	return (
		<Button
			variant="blue_2"
			text={text || 'Editar'}
			icon={LuPencil}
			onClick={onClick}
			type="button"
			size="md"
			disabled={disabled}
		/>
	);
};

export default EditActionButton;
