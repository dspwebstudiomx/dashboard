import Button from "@components/Botones/Button";
import React from "react";
import { LuPencil } from "react-icons/lu";

const EditActionButton = ({ onClick, text }) => {
  return (
    <Button
      variant="blue_3"
      text={text}
      icon={LuPencil}
      onClick={onClick}
      type="button"
    />
  );
};

export default EditActionButton;
