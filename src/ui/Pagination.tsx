import * as React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, start + maxVisible - 1);
            
            if (end === totalPages) {
                start = Math.max(1, end - maxVisible + 1);
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-wrap justify-center sm:justify-end items-center mt-4 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-neutral-700 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
            >
                <FiChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-neutral-700 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
            >
                <FiChevronRight size={20} />
            </button>
            
            <span className="ml-2 text-sm text-gray-600 whitespace-nowrap">
                Page {currentPage} of {totalPages}
            </span>
        </div>
    );
}
