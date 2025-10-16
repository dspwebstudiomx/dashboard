import ClientImage from '@components/Imagenes/ClientImage';
import FullNameText from '@components/Texts/FullNameText';
import NewClientTag from '@components/Tags/NewClientTag';
import EditClientButton from '@components/Botones/EditClientButton';

const ClientHeader = ({ selectedClient, handleOpenModal, client }) => {
	return (
		<h1 className="text-2xl md:text-3xl mb-12 flex flex-col md:flex-row items-center gap-6">
			<div className="flex items-center gap-4">
				<ClientImage selectedClient={selectedClient || client} />
				<div className="flex flex-col gap-3">
					<FullNameText selectedClient={selectedClient || client} />
					<NewClientTag selectedClient={selectedClient || client} />
				</div>
				<EditClientButton client={selectedClient} handleOpenModal={handleOpenModal} />
			</div>
		</h1>
	);
};

export default ClientHeader;
