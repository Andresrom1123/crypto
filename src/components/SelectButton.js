import React from "react";

export const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span className={selected ? "text-danger" : ""} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
