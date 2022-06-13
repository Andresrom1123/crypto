import React from "react";

export const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      className={`shadow -pointer py-2 pe-2 fs-6 border border-warning rounded me-3 ${
        selected ? "text-black bg-warning" : ""
      }`}
      style={{
        width: "200px",
        color: selected ? "" : "var(--clr-primary-1)",
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
