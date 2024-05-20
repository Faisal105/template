import React from "react";
import Image from "../image/Image";

const Banner = ({ imageUrl, altText }) => {
	return (
		<div className="w-full h-60 md:h-96 lg:h-[32rem] overflow-hidden relative">
			<Image
				src={imageUrl}
				alt={altText}
				customClasses="w-full h-full object-cover"
			/>
		</div>
	);
};

export default Banner;
