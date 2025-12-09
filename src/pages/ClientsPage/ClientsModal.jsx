import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FaSave, FaTimes } from 'react-icons/fa';
import useClientForm from './hooks/useClientForm';
import ClientFormFields from './components/ClientFormFields';
import Button from '@components/Botones/Button';
import { IoPerson, IoPersonAdd, IoPersonAddOutline } from 'react-icons/io5';
import ImageClientModal from './components/ImageClientModal';

const ClientsModal = ({ client, onClientUpdate, isOpen, onClose }) => {
	const {
		formData,
		setFormData,
		handleChange,
		handleSubmit,
		handleImageUpload,
		handleRemoveImage,
		isEditing,
	} = useClientForm({ client, onClientUpdate, onClose });

	useEffect(() => {
		if (client) {
			setFormData(client);
		} else {
			setFormData({
				fullName: '',
				lastName: '',
				lastName2: '',
				email: '',
				phoneNumber: '',
				address: '',
				company: '',
				rfc: '',
				curp: '',
				website: '',
				facebook: '',
				twitter: '',
				instagram: '',
				linkedin: '',
				project: '',
				image: '',
			});
		}
	}, [client, setFormData]);

	const renderTitle = (isEditing) => (
		<div className="flex items-center justify-center gap-4">
			{isEditing ? (
				<>
					<IoPerson className="text-blue-700 dark:text-blue-400" />
					<span>Editar Cliente</span>
				</>
			) : (
				<>
					<IoPersonAdd className="text-blue-700 dark:text-blue-400" />
					<span>Agregar Cliente</span>
				</>
			)}
		</div>
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={renderTitle(isEditing)}>
			<form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] text-base">
				{/* // Formulario de cliente */}
				<ClientFormFields formData={formData} handleChange={handleChange} />

				{/* // Botones de acción y subida de imagen */}
				<div className="flex flex-col md:flex-row justify-end items-end gap-1 md:gap-4 p-2">
					<ImageClientModal
						formData={formData}
						handleImageUpload={handleImageUpload}
						handleRemoveImage={handleRemoveImage}
					/>
					<div className="flex flex-col md:flex-row gap-2 justify-end items-center">
						<Button
							variant="secondary"
							type="button"
							onClick={onClose}
							text="Cancelar"
							icon={FaTimes}
						/>
						{isEditing ? (
							<Button variant="primary" type="submit" text="Actualizar cliente" icon={FaSave} />
						) : (
							<Button
								variant="primary"
								type="submit"
								text="Agregar cliente"
								icon={IoPersonAddOutline}
							/>
						)}
					</div>
				</div>
			</form>
		</Modal>
	);
};

ClientsModal.propTypes = {
	client: PropTypes.object,
	onClientUpdate: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export { ClientsModal };
