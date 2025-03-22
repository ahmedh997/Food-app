import React, { useState } from 'react';

export default function Pagination({ getList, arrayOfPages, itemsPerPage = 5 }) {
    const [currentNumber, setCurrentNumber] = useState(1);

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

    if (!arrayOfPages?.length) {
        return null;
    }

    return (
        <nav aria-label="Page navigation" className="m-3  d-flex  justify-content-end">
            <ul className="pagination">
                <li className={`page-item ${currentNumber === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handlePrev}
                        disabled={currentNumber === 1}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">Previous</span>
                    </button>
                </li>

                
                <li className={`page-item ${currentNumber === 1 ? 'active' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageClick(1)}
                        aria-current={currentNumber === 1 ? 'page' : undefined}
                    >
                        1
                    </button>
                </li>

                
                {currentNumber > 3 && (
                    <li className="page-item disabled">
                        <button className="page-link" disabled>
                            ...
                        </button>
                    </li>
                )}

                
                {arrayOfPages.map((page) => {
                    if (page > 1 && page < arrayOfPages.length && Math.abs(page - currentNumber) <= 1) {
                        return (
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
                        );
                    }
                    return null;
                })}

                
                {currentNumber < arrayOfPages.length - 2 && (
                    <li className="page-item disabled">
                        <button className="page-link" disabled>
                            ...
                        </button>
                    </li>
                )}

                
                {arrayOfPages.length > 1 && (
                    <li className={`page-item ${currentNumber === arrayOfPages.length ? 'active' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(arrayOfPages.length)}
                            aria-current={currentNumber === arrayOfPages.length ? 'page' : undefined}
                        >
                            {arrayOfPages.length}
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
                        <span aria-hidden="true">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}