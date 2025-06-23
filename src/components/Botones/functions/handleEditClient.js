export function handleEditClient({ validateClient, editClient, resetForm, setShowModal, newClient, editClientId }) {
  if (validateClient(newClient)) {
    editClient(editClientId, newClient);
    resetForm();
    setShowModal(false);
  }
};
