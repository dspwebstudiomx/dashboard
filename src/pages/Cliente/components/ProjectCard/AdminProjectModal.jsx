import React, { useState } from "react";
import Modal from "@components/Modal";
import ContentProjectCard from "./ContentProjectCard";
import Priority from "../Priority";
import ProjectDescriptionInfoCard from "../ProjectDescriptionInfoCard";
import LinePriorityCard from "./LinePriority";
import ServicesProjectTag from "../ServicesProjectTag";
import SectionsProjectTag from "../SectionsProjectTag";
import GrayLine from "@components/Lineas/GrayLine";

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
      <div id="modal-content" className="flex flex-col gap-8 pb-20">
        <div className="flex flex-col md:flex-row gap-4 h-10 w-auto justify-start items-center">
          <h2 className="text-xl font-semibold">Prioridad:</h2>{" "}
          <Priority project={project} />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Descripción del Proyecto</h2>
          <ProjectDescriptionInfoCard
            project={project}
            isLongDescription={project.description.length > 100}
            shortDesc={project.description.substring(0, 100)}
            showFullDesc={showFullDesc}
            setShowFullDesc={setShowFullDesc}
          />
        </div>

        <GrayLine />

        <div className="flex flex-col md:flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
            <ServicesProjectTag project={project} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
            <SectionsProjectTag project={project} />
          </div>
        </div>

        <GrayLine />

        <div
          id="Asignacion-Tareas"
          className="flex flex-col md:flex-col gap-12">
          {/* Asignar tareas con nombre, descripcion, porcentaje de avance, prioridad */}
        </div>
      </div>
    </Modal>
  );
};

export default AdminProjectModal;
