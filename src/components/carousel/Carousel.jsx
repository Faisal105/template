import React, { useState } from "react";

const Carousel = ({ images, heading }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsToShow = 4;

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? Math.max(images.length - itemsToShow, 0) : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex >= images.length - itemsToShow ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<h2 className="text-2xl font-bold mb-4 text-center">{heading}</h2>
			<div className="relative w-full">
				<div className="flex overflow-hidden">
					{images
						.slice(currentIndex, currentIndex + itemsToShow)
						.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`Slide ${currentIndex + index}`}
								className="w-1/4 h-40 md:h-64 object-cover mx-2"
							/>
						))}
				</div>
				<button
					onClick={handlePrevious}
					className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-transparent hover:bg-gray-200 focus:outline-none transition-colors duration-300"
					aria-label="Previous">
					<svg
						className="w-6 h-6 text-blue-500 hover:text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
				<button
					onClick={handleNext}
					className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-transparent hover:bg-gray-200 focus:outline-none transition-colors duration-300"
					aria-label="Next">
					<svg
						className="w-6 h-6 text-blue-500 hover:text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5l7 7-7 7"></path>
					</svg>
				</button>
			</div>
			<div className="flex mt-4">
				{Array.from({ length: Math.ceil(images.length / itemsToShow) }).map(
					(_, index) => (
						<div
							key={index}
							className={`w-3 h-3 mx-1 rounded-full ${
								index === Math.floor(currentIndex / itemsToShow)
									? "bg-blue-500"
									: "bg-gray-300"
							}`}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Carousel;
