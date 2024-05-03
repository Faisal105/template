import React from "react";

const Text = ({ children, customClasses = "" }) => {
	const textClasses = `tracking-widest text-gray-500 md:text-lg dark:text-gray-400 ${customClasses}`;
	return <p className={textClasses}>{children}</p>;
};

export default Text;
