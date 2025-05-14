import React from "react";

const Section = ({ children, columns, className }) => {
  return <section className={`${columns} ${className}`}>{children}</section>;
};

export default Section;
