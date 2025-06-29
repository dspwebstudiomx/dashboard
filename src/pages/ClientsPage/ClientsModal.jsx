import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FaCross } from 'react-icons/fa6';
import useClientForm from './hooks/useClientForm';
import ClientFormFields from './components/ClientFormFields';
import Button from '@components/Botones/Button';
import { IoPerson, IoPersonAdd, IoPersonAddOutline } from 'react-icons/io5';
import ImageClientModal from './components/ImageClientModal';

const ClientsModal = ({
	client,
	onClientUpdate,
	modal, // { isOpen, openModal, closeModal }
}) => {
	const {
		formData,
		setFormData,
		handleChange,
		handleSubmit,
		handleImageUpload,
		handleRemoveImage,
		isEditing,
	} = useClientForm({ client, onClientUpdate, onClose: modal.closeModal });

	useEffect(() => {
		if (client) {
			setFormData(client);
		} else {
			setFormData({ nombre: '', email: '', imagen: '', telefono: '' });
		}
	}, [client, setFormData]);

	const renderTitle = (isEditing) => (
		<div className="flex items-center justify-center gap-4">
			{isEditing ? (
				<>
					<IoPerson className="text-blue-600" />
					<span>Editar Cliente</span>
				</>
			) : (
				<>
					<IoPersonAdd className="text-blue-600" />
					<span>Agregar Cliente</span>
				</>
			)}
		</div>
	);

	return (
		<Modal isOpen={modal.isOpen} onClose={modal.closeModal} title={renderTitle(isEditing)}>
			<form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] text-base">
				{/* // Formulario de cliente */}
				<ClientFormFields formData={formData} handleChange={handleChange} />

				{/* // Botones de acción y subida de imagen */}
				<div className="flex flex-col md:flex-row justify-between items-end gap-1 md:gap-4 p-2">
					<ImageClientModal
						formData={formData}
						handleImageUpload={handleImageUpload}
						handleRemoveImage={handleRemoveImage}
					/>
					<div className="flex flex-col md:flex-row gap-2 justify-end items-center">
						<Button variant="secondary" type="button" onClick={modal.closeModal} text="Cancelar" />
						{isEditing ? (
							<Button variant="primary" type="submit" text="Actualizar cliente" icon={FaCross} />
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
	modal: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired,
		openModal: PropTypes.func.isRequired,
		closeModal: PropTypes.func.isRequired,
	}).isRequired,
};

export { ClientsModal };
