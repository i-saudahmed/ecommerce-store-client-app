import React from "react";

interface InputProps {
  id: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  // const isDisabled = name === "email";
  console.log(disabled);

  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border rounded-md w-full"
      disabled={disabled}
    />
  );
};

export { Input };
