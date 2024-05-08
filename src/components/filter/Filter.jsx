import React from "react";

const Filter = ({ options, selectedOption, onSelect }) => {
	return (
		<div className="flex items-center justify-center space-x-4">
			<label htmlFor="filter">Filter By:</label>
			<ul className="flex items-center space-x-4">
				{options.map((option, index) => (
					<li
						key={index}
						className={`cursor-pointer flex items-center space-x-2`}
						onClick={() => onSelect(option.value)}>
						<span
							className={`w-4 h-4 rounded-full border border-gray-400 ${
								selectedOption === option.value ? "bg-gray-400" : ""
							}`}></span>
						<span>{option.label}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Filter;
