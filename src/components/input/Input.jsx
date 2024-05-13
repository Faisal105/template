import React from "react";

const Input = ({
  onChange,
  value,
  placeholder = "Enter value",
  inputType = "text",
  customClasses = "",
  ...props
}) => {
  let inputClasses = `px-4 py-2 rounded-md text-base transition-colors hover:cursor-pointer duration-300 
		${customClasses}`;

  if (inputType === "text") {
    inputClasses += " border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  } else if (inputType === "password") {
    inputClasses += " border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  } else if (inputType === "email") {
    inputClasses += " border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  }

  return (
    <input
      type={inputType}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={inputClasses}
      {...props}
    />
  );
};

export default Input;
