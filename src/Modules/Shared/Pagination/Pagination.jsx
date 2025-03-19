import React, { useState } from 'react';

export default function Pagination({ getList, arrayOfPages, itemsPerPage = 5 }) {
    const [currentNumber, setCurrentNumber] = useState(1);
    const maxVisiblePages = 5; 

    const handleNext = () => {
        if (currentNumber < arrayOfPages.length) {
            const nextPage = currentNumber + 1;
            setCurrentNumber(nextPage);
            getList(itemsPerPage, nextPage);
        }
    };

    const handlePrev = () => {
        if (currentNumber > 1) {
            const prevPage = currentNumber - 1;
            setCurrentNumber(prevPage);
            getList(itemsPerPage, prevPage);
        }
    };

    const handlePageClick = (page) => {
        if (page !== currentNumber) {
            setCurrentNumber(page);
            getList(itemsPerPage, page);
        }
    };

    const getVisiblePages = () => {
        const totalPages = arrayOfPages.length;
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(currentNumber - half, 1);
        let end = Math.min(start + maxVisiblePages - 1, totalPages);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(end - maxVisiblePages + 1, 1);
        }

        return arrayOfPages.slice(start - 1, end);
    };

    if (!arrayOfPages?.length) {
        return null;
    }

    return (
        <nav aria-label="Page navigation" className="m-3">
            <ul className="pagination">
                <li className={`page-item ${currentNumber === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handlePrev}
                        disabled={currentNumber === 1}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {getVisiblePages().map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentNumber === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(page)}
                            aria-current={currentNumber === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {arrayOfPages.length > maxVisiblePages && currentNumber < arrayOfPages.length - 2 && (
                    <li className="page-item disabled">
                        <button className="page-link" disabled>
                            ...
                        </button>
                    </li>
                )}

                <li className={`page-item ${currentNumber === arrayOfPages.length ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handleNext}
                        disabled={currentNumber === arrayOfPages.length}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}