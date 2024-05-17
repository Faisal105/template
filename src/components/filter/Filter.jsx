import React, { useEffect, useState } from 'react';

const Filters = ({ onApplyFilters, filterConfig }) => {
	const [filterValues, setFilterValues] = useState({});

	const handleInputChange = (category, value, type) => {
		setFilterValues(prev => ({
			...prev,
			[category]: type === 'checkbox' ? { ...prev[category], [value]: !prev[category]?.[value] } : value
		}));
	};

	useEffect(() => {
		onApplyFilters(filterValues);
	}, [filterValues]);

	const handleClearFilters = () => {
		setFilterValues({});
		handleInputChange();
		onApplyFilters(filterValues);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		onApplyFilters(filterValues);
	};

	return (
		<section className='p-5 bg-[#eee] rounded-lg'>
			<form onSubmit={handleSubmit} className="space-y-7">
				{Object.entries(filterConfig).map(([key, { label, type, options }]) => (
					<article key={key} className='flex flex-col space-y-3'>
						<h3 className="font-bold">{label}</h3>
						{options.map(option => (
							<label key={option.value} className="inline-flex items-center space-x-2">
								<input
									type={type === 'checkbox' ? 'checkbox' : 'radio'}
									name={key}
									value={option.value}
									checked={type === 'checkbox' ? filterValues[key]?.[option.value] : filterValues[key] === option.value}
									onChange={() => handleInputChange(key, option.value, type)}
									className="focus:ring-0 hover:cursor-pointer"
								/>
								<span>{option.label}</span>
							</label>
						))}
					</article>
				))}
					<button className='underline text-blue-500 text-base' onClick={handleClearFilters}>Clear Filters</button>
					{/* <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply Filters</button> */}
			</form>
		</section>
	);
};

export default Filters;
