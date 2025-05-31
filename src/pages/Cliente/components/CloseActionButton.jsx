import Button from '@components/Botones/Button';
import React from 'react';
import { MdLockOutline } from 'react-icons/md';

const CloseActionButton = ({ onClick, text }) => {
	return (
		<Button variant="outline" onClick={onClick} type="button" text={text} icon={MdLockOutline} />
	);
};

export default CloseActionButton;
