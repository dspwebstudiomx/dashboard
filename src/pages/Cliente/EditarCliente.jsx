import React from "react";
import ClientsModal from "../ClientsPage/ClientsModal";

const EditarCliente = ({
  selectedClient,
  handleSaveClient,
  handleCloseModal,
  isModalOpen,
  handleClientUpdate,
}) => {
  return (
    <>
      {isModalOpen && (
        <ClientsModal
          client={selectedClient}
          onSave={handleSaveClient}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
          isEditing={!!selectedClient}
          onClientUpdate={handleClientUpdate} // Pasa la función al componente hijo
        />
      )}
    </>
  );
};

export default EditarCliente;
