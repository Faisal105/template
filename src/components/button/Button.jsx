import React from "react";

const Button = ({
	onClick,
	label = "Submit",
	buttonType = "primary",
	customClasses = "",
	...props
}) => {
	let btnClasses = `px-4 py-2 rounded-md cursor-pointer text-base transition-colors duration-300 
		${customClasses}`;

	// Apply specific styles based on buttonType
	if (buttonType === "primary") {
		btnClasses += " bg-blue-500 text-white";
	} else if (buttonType === "secondary") {
		btnClasses += " bg-gray-300 text-gray-800";
	} else if (buttonType === "danger") {
		btnClasses += " bg-red-500 text-white";
	} else if (buttonType === "success") {
		btnClasses += " bg-red-500 text-white";
	}

	return (
		<button onClick={onClick} className={btnClasses} {...props}>
			{label}
		</button>
	);
};

export default Button;
