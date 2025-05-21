import React, { useState } from "react";
import Button from "@components/Botones/Button";
import { LuPencil } from "react-icons/lu";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import ServicesProjectTag from "./ServicesProjectTag";
import SectionsProjectTag from "./SectionsProjectTag";
import ProjectDescriptionInfoCard from "./ProjectDescriptionInfoCard";
import Priority from "./Priority";
import TitleProjectCard from "@components/Texts/TitleProjectCard";
import ProjectCardDates from "./ProjectCardDates";
import TotalCostProyectCard from "./TotalCostProyectCard";
import CloseProjectMessaje from "./CloseProjectMessaje";
import CloseActionButton from "./CloseActionButton";
import DeleteActionButton from "./DeleteActionButton";
import EditActionButton from "./EditActionButton";
import AdminActionButton from "./AdminActionButton";

const ContentProjectCard = ({
  project,
  isCompleted,
  onEdit,
  onDelete,
  handleCompleteClick,
  totalConImpuestos,
  openAdminModal,
}) => {
  // Lógica de descripción y estados visuales
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descriptionWords = project.description
    ? project.description.split(" ")
    : [];
  const isLongDescription = descriptionWords.length > 40;
  const shortDesc = isLongDescription
    ? descriptionWords.slice(0, 40).join(" ") + "..."
    : project.description;

  return (
    <article className="flex flex-col md:flex-row gap-12 p-6 md:p-8 justify-between">
      <div className="flex flex-col gap-8 text-balance w-full ">
        {/* Título y prioridad */}
        <div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-12 md:gap-6">
          <TitleProjectCard project={project} />
          <div className="flex justify-end md:items-center gap-2">
            <Priority project={project} />
          </div>
        </div>

        <ProjectDescriptionInfoCard
          project={project}
          isLongDescription={isLongDescription}
          shortDesc={shortDesc}
          showFullDesc={showFullDesc}
          setShowFullDesc={setShowFullDesc}
        />
        <ServicesProjectTag project={project} />
        <SectionsProjectTag project={project} />
      </div>

      {/* Datos del Proyecto */}
      <div className="text-lg md:text-base">
        {/* Fechas y total del proyecto */}
        <div className="flex flex-col gap-2 mt-4">
          <ProjectCardDates project={project} isCompleted={isCompleted} />
          <TotalCostProyectCard totalConImpuestos={totalConImpuestos} />
        </div>

        {/* Botones de acción */}
        <div
          id="botones-tarjeta-proyecto"
          className="flex flex-col gap-4 mt-16 mb-8 md:mt-8">
          <div className="flex flex-col gap-1 items-center">
            {!isCompleted && (
              <>
                <AdminActionButton
                  onClick={openAdminModal}
                  text={"Ver Proyecto"}
                />
                <EditActionButton onClick={onEdit} text={"Editar Proyecto"} />
                <DeleteActionButton
                  onClick={onDelete}
                  text={"Eliminar Proyecto"}
                />
                <CloseActionButton
                  handleCompleteClick={handleCompleteClick}
                  text={"Cerrar Proyecto"}
                  onClick={handleCompleteClick}
                />
              </>
            )}
          </div>
          {isCompleted && <CloseProjectMessaje />}
        </div>
      </div>
    </article>
  );
};

export default ContentProjectCard;
