import Button from '@components/Botones/Button';
import React from 'react';
import { FaRegEye } from 'react-icons/fa6';

const AdminActionButton = ({ onClick, text }) => {
	return (
		<Button
			variant="primary"
			text={text}
			icon={FaRegEye}
			onClick={onClick}
			type="button"
			size="md"
		/>
	);
};

export default AdminActionButton;
