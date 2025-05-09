import React from "react";

const Section = ({ children, columns }) => {
  return (
    <section className={`place-content-center ${columns}`}>{children}</section>
  );
};

export default Section;
