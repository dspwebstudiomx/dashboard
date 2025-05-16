import React from "react";

const NewClientTag = ({ selectedClient }) => {
  return (
    <>
      {selectedClient?.createdAt &&
        (() => {
          const created = new Date(selectedClient.createdAt);
          const now = new Date();
          const diffTime = now - created;
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return diffDays <= 7 ? (
            <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold w-[110px] text-center">
              Nuevo Cliente
            </span>
          ) : null;
        })()}
    </>
  );
};

export default NewClientTag;
