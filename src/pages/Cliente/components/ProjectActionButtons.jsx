import AdminActionButton from './AdminActionButton';
import CloseActionButton from './CloseActionButton';
import DeleteActionButton from './DeleteActionButton';
import EditActionButton from './EditActionButton';

const ProjectActionButtons = ({
	isCompleted,
	openAdminModal,
	onEdit,
	onDelete,
	handleCompleteClick,
}) => {
	if (isCompleted) return null;
	return (
		<>
			<AdminActionButton onClick={openAdminModal} text="Ver Proyecto" />
			<EditActionButton onClick={onEdit} text="Editar Proyecto" />
			<DeleteActionButton onClick={onDelete} text="Eliminar Proyecto" />
			<CloseActionButton
				handleCompleteClick={handleCompleteClick}
				text="Cerrar Proyecto"
				onClick={handleCompleteClick}
			/>
		</>
	);
};

export default ProjectActionButtons;
