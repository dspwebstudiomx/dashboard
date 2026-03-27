import Button from '@components/Botones/Button';
import React from 'react';
import { FaRegEye } from 'react-icons/fa6';

const AdminActionButton = ({ onClick, text, isCompleted = false }) => {
	return (
		<Button
			variant={isCompleted ? 'secondary' : 'primary'}
			text={text}
			icon={FaRegEye}
			onClick={onClick}
			type="button"
			size="md"
			className={isCompleted ? 'bg-gray-700 hover:bg-gray-800 text-gray-100 border-gray-700' : ''}
		/>
	);
};

export default AdminActionButton;
