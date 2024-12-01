import React from 'react';
import { PaginationProps } from '../shared/types';
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-50 dark:text-gray-400">
          Page
          <span className="font-semibold text-white dark:text-white px-3">
            {currentPage}
          </span>
          of
          <span className="font-semibold text-white dark:text-white px-3">
            {totalPages}
          </span>
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
