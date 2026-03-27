import Button from '@components/Botones/Button';
import React from 'react';
import { MdLockOutline } from 'react-icons/md';

const CloseActionButton = ({ onClick, text, disabled }) => {
	return (
		<Button
			variant="outline"
			onClick={onClick}
			type="button"
			text={text}
			icon={MdLockOutline}
			size="md"
			disabled={disabled}
		/>
	);
};

export default CloseActionButton;
