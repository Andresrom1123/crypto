import React from "react";

export const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      className={`shadow -color-oscuro -pointer py-2 pe-2 fs-6 -button rounded me-3 ${
        selected ? "-bg-secondary -color-claro" : ""
      }`}
      style={{
        width: "200px",
        border: "1px solid var(--clr-neutro)",
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
