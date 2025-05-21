import React from "react";

const ProjectDescriptionInfoCard = ({
  project,
  isLongDescription,
  shortDesc,
  showFullDesc,
  setShowFullDesc,
}) => {
  return (
    <div>
      <p style={{ whiteSpace: "pre-line" }}>
        {showFullDesc || !isLongDescription ? project.description : shortDesc}
      </p>

      {isLongDescription && (
        <button
          className="text-blue-600 dark:text-blue-700 ml-2 mt-4 font-semibold"
          onClick={() => setShowFullDesc((prev) => !prev)}
          type="button">
          {showFullDesc ? "Ver menos" : "Ver más..."}
        </button>
      )}
    </div>
  );
};

export default ProjectDescriptionInfoCard;
