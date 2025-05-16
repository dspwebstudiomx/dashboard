import React from "react";

const FullNameText = ({ selectedClient }) => {
  return (
    <span>
      {selectedClient?.fullName} {selectedClient?.lastName}{" "}
      {selectedClient?.lastName2}
    </span>
  );
};

export default FullNameText;
