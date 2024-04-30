import React from "react";

const Heading = ({ children, customClasses = "" }) => {
	const headingClasses = "text-lg font-bold dark:text-white";
	return <p className={`${headingClasses}  ${customClasses}`}>{children}</p>;
};

export default Heading;
