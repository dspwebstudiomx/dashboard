import React, { useState } from "react";
import Modal from "@components/Modal";
import ContentProjectCard from "./ContentProjectCard";
import Priority from "../Priority";
import ProjectDescriptionInfoCard from "../ProjectDescriptionInfoCard";
import LinePriorityCard from "./LinePriority";

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
      <div id="modal-content" className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 h-10 w-auto">
          <Priority project={project} />
        </div>
        <ProjectDescriptionInfoCard
          project={project}
          isLongDescription={project.description.length > 100}
          shortDesc={project.description.substring(0, 100)}
          showFullDesc={showFullDesc}
          setShowFullDesc={setShowFullDesc}
        />
      </div>
    </Modal>
  );
};

export default AdminProjectModal;
