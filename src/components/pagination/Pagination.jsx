import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const renderPages = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<li key={i}>
					<a
						href="#"
						className={`flex items-center justify-center px-4 h-10 leading-tight ${
							currentPage === i
								? "text-blue-600 bg-blue-50"
								: "text-gray-500 bg-white"
						} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
						onClick={() => onPageChange(i)}>
						{i}
					</a>
				</li>
			);
		}
		return pages;
	};

	return (
		<nav aria-label="Page navigation example">
			<ul className="flex items-center -space-x-px h-10 text-base">
				<li>
					<a
						href="#"
						className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => onPageChange(currentPage - 1)} // Handle previous page click
						disabled={currentPage === 1} // Disable if already on first page
					>
						<span className="sr-only">Previous</span>
						<svg
							className="w-3 h-3 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
					</a>
				</li>
				{renderPages()}
				<li>
					<a
						href="#"
						className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => onPageChange(currentPage + 1)} // Handle next page click
						disabled={currentPage === totalPages} // Disable if already on last page
					>
						<span className="sr-only">Next</span>
						<svg
							className="w-3 h-3 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
