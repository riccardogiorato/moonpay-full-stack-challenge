import React from "react";

export interface ToogleProps {
  label: React.ReactNode;
  active: boolean;
  onChange?: (newVal: boolean) => void;
}

export const Toggle: React.FC<ToogleProps> = ({ label, active, onChange }) => {
  const changeHandler = () => {
    onChange && onChange(!active);
  };
  return (
    <button className="toggle" onClick={changeHandler}>
      {label}:{active ? "Yes" : "All"}
    </button>
  );
};
