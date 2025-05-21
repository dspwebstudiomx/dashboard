import React, { useState } from "react";

import ServicesProjectTag from "../ServicesProjectTag";
import SectionsProjectTag from "../SectionsProjectTag";
import ProjectDescriptionInfoCard from "../ProjectDescriptionInfoCard";
import Priority from "../Priority";
import TitleProjectCard from "@components/Texts/TitleProjectCard";
import ProjectCardDates from "./ProjectCardDates";
import TotalCostProyectCard from "../TotalCostProyectCard";
import CloseProjectMessaje from "./CloseProjectMessaje";
import { useProjectDescription } from "@hooks/useProjectDescription";
import ProjectActionButtons from "../ProjectActionButtons";

const ContentProjectCard = ({
  project,
  isCompleted,
  onEdit,
  onDelete,
  handleCompleteClick,
  totalConImpuestos,
  openAdminModal,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { isLong, short } = useProjectDescription(project.description);

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
          isLongDescription={isLong}
          shortDesc={short}
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
        <ProjectActionButtons
          isCompleted={isCompleted}
          openAdminModal={openAdminModal}
          onEdit={onEdit}
          onDelete={onDelete}
          handleCompleteClick={handleCompleteClick}
        />
        {isCompleted && <CloseProjectMessaje />}
      </div>
    </article>
  );
};

export default ContentProjectCard;
