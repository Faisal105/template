import React from "react";

const Heading = ({ children, customClasses = "" }) => {
	const headingClasses = `text-lg font-bold dark:text-white ${customClasses}`;
	return <p className={headingClasses}>{children}</p>;
};

export default Heading;
