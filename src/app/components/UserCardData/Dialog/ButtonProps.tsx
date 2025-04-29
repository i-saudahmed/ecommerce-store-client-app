import useApiStore from "@/Zustand/Store";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "outline" | "filled";
}
const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "filled",
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md ${
        variant === "outline"
          ? "border-2 border-gray-300 text-gray-700"
          : "bg-blue-500 text-white"
      }`}
    >
      {children}
    </button>
  );
};

export { Button };
