import React from "react";

const Counter = ({ quantity, onIncrease, onDecrease }) => {
	return (
		<div className="flex items-center border border-gray-300 rounded-md px-3 py-1 justify-between">
			{/* Button to decrease quantity */}
			<button
				onClick={(e) => {
					e.preventDefault();
					onDecrease();
				}}
				className="text-gray-500 focus:outline-none">
				{/* Tailwind CSS icon for minus */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20 12H4"
					/>
				</svg>
			</button>
			{/* Display quantity in the center */}
			<span className="mx-2">{quantity}</span>
			{/* Button to increase quantity */}
			<button
				onClick={(e) => {
					e.preventDefault();
					onIncrease();
				}}
				className="text-gray-500 focus:outline-none">
				{/* Tailwind CSS icon for plus */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
			</button>
		</div>
	);
};

export default Counter;
