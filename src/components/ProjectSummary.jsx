import React from "react";

const ProjectSummary = () => {
  const projects = [
    { name: "Proyecto A", progress: 80 },
    { name: "Proyecto B", progress: 50 },
    { name: "Proyecto C", progress: 30 },
  ];

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="flex justify-between items-center">
          <span>{project.name}</span>
          <div className="w-2/3 bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${project.progress}%` }}></div>
          </div>
          <span>{project.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectSummary;
