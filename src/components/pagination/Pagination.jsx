import React, { useEffect, useState } from "react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    pageRangeDisplayed = 5,
    pageLinkClasses = "flex items-center justify-center px-4 h-10 leading-tight border border-gray-300",
    activeLinkClasses = "text-blue-600 bg-blue-50 cursor-default",
    normalLinkClasses = "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white",
}) => {
    const [paginationItems, setPaginationItems] = useState([]);

    useEffect(() => {
        const getPaginationRange = () => {
            const start = Math.max(2, currentPage - Math.floor(pageRangeDisplayed / 2));
            const end = Math.min(totalPages - 1, currentPage + Math.floor(pageRangeDisplayed / 2));
            const range = [];

            for (let i = start; i <= end; i++) {
                range.push(i);
            }

            if (start > 2) {
                range.unshift('...');
            }
            if (end < totalPages - 1) {
                range.push('...');
            }

            range.unshift(1);
            if (totalPages > 1) {
                range.push(totalPages);
            }

            return range;
        };

        const items = getPaginationRange().map((page, index) => {
            if (page === '...') {
                return <li key={index} className="px-4 h-10 leading-tight text-gray-500">...</li>;
            }
            const isActive = currentPage === page;
            const linkClasses = `${pageLinkClasses} ${isActive ? activeLinkClasses : normalLinkClasses}`;

            return (
                <li key={page}>
                    <a
                        href="#"
                        className={linkClasses}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isActive) {
                                onPageChange(page);
                            }
                        }}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {page}
                    </a>
                </li>
            );
        });

        setPaginationItems(items);
    }, [currentPage, totalPages, onPageChange, pageRangeDisplayed, pageLinkClasses, activeLinkClasses, normalLinkClasses]);

    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <a
                        href="#"
                        className={`${pageLinkClasses} rounded-s-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        aria-label="Previous page"
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </a>
                </li>
                {paginationItems}
                <li>
                    <a
                        href="#"
                        className={`${pageLinkClasses} rounded-e-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        aria-label="Next page"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
