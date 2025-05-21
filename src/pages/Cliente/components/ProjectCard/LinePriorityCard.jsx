import React from "react";

const LinePriorityCard = ({ project }) => {
  return (
    <div
      className={`h-2 w-full ${
        project.completed
          ? "bg-blue-600 text-gray-100"
          : project.priority === "Alta"
          ? "bg-red-500 text-gray-100"
          : project.priority === "Media"
          ? "bg-yellow-400 text-gray-800"
          : "bg-green-600 text-gray-100"
      }`}></div>
  );
};

export default LinePriorityCard;
