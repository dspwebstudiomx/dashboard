import Button from "@components/Botones/Button";
import React from "react";
import { FaEye } from "react-icons/fa6";

const AdminActionButton = ({ onClick, text }) => {
  return (
    <Button
      variant="primary"
      text={text}
      icon={FaEye}
      onClick={onClick}
      type="button"
    />
  );
};

export default AdminActionButton;
