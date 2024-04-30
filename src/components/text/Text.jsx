import React from "react";

const Text = ({ children, customClasses = "" }) => {
    const textClasses =
			"tracking-widest text-gray-500 md:text-lg dark:text-gray-400";
	return <p className={`${textClasses}  ${customClasses}`}>{children}</p>;
};

export default Text;
