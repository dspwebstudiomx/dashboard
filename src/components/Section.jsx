import React from "react";

const Section = ({ children, columns }) => {
  return <section className={`${columns} bg-red-300`}>{children}</section>;
};

export default Section;
