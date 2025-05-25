import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegImage } from 'react-icons/fa6';
import useClientForm from './hooks/useClientForm';
import ClientFormFields from './components/ClientFormFields';
import Button from '@components/Botones/Button';
import { IoPersonAddOutline } from 'react-icons/io5';
import ImageClientModal from './components/ImageClientModal';

const ClientsModal = ({ isOpen, onClose, client, onClientUpdate }) => {
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
			// Rellenar el formulario con los datos del cliente
			setFormData(client);
		} else {
			// Limpiar el formulario para agregar nuevo cliente
			setFormData({ nombre: '', email: '', imagen: '', telefono: '' });
		}
	}, [client, setFormData]);

	return (
		<Modal
			isOpen={isOpen}
			onClick={onClose} // <-- Corrige aquí
			title={isEditing ? 'Editar Cliente' : 'Agregar Cliente'}
			className="flex items-center justify-center"
		>
			<form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] text-base">
				<ClientFormFields formData={formData} handleChange={handleChange} />
				<div className="flex flex-col md:flex-row justify-center items-end gap-1 md:gap-4 p-2">
					<ImageClientModal
						formData={formData}
						handleImageUpload={handleImageUpload}
						handleRemoveImage={handleRemoveImage}
					/>
					<Button variant="secondary" type="button" onClick={onClose} text="Cancelar" />
					{isEditing ? (
						<Button variant="primary" type="submit" text="Actualizar cliente" />
					) : (
						<Button
							variant="primary"
							type="submit"
							text="Agregar cliente"
							icon={IoPersonAddOutline}
						/>
					)}
				</div>
			</form>
		</Modal>
	);
};

ClientsModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	client: PropTypes.object,
	onClientUpdate: PropTypes.func.isRequired,
};

export default ClientsModal;
