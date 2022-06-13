import React from "react";

export const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      className={`shadow text-blac -pointer py-2 pe-2 fs-6 border border -button rounded me-3 ${
        selected ? "k -bg-primary" : ""
      }`}
      style={{
        width: "200px",
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
