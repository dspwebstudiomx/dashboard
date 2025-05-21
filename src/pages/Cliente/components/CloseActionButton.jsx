import Button from "@components/Botones/Button";
import React from "react";
import { MdLockOutline } from "react-icons/md";

const CloseActionButton = ({ onClick, text }) => {
  return (
    <Button
      className="text-white px-4 h-15 w-full md:w-[210px] mx-auto  rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300"
      onClick={onClick}
      type="button"
      text={text}
      icon={MdLockOutline}
    />
  );
};

export default CloseActionButton;
