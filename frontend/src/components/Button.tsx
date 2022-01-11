import React from "react";

export interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
