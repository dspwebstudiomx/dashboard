import React from "react";
import Modal from "@components/Modal";

const AdminProjectModal = ({ isOpen, onClose, project }) => (
  <Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
    <h2 className="text-xl font-semibold mb-4">Administrar Proyecto</h2>
    <p>{project.title}</p>
  </Modal>
);

export default AdminProjectModal;
