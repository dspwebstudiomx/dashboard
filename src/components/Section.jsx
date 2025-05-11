import React from "react";

const Section = ({ children, columns }) => {
  return <section className={`${columns}`}>{children}</section>;
};

export default Section;
