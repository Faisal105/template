import React from "react";

const Filter = ({ options, onSelect }) => {
	return (
		<div className="p-2 border rounded-md shadow-md w-32">
			<label className="block font-bold mb-2">{options.label}</label>
			<div>
				{options.filters.map((filter, index) => (
					<div key={index} className="flex items-center mb-2">
						<input
							type="checkbox"
							id={filter.value}
							value={filter.value}
							className="mr-2 cursor-pointer"
							onChange={() => onSelect(filter.value)}
						/>
						<label htmlFor={filter.value} className="cursor-pointer">
							{filter.label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default Filter;
