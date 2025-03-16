import React, { useState } from 'react';

export default function Pagination({ getList, arrayOfPages }) {

    const [currentNumber, setCurrentNumber] = useState(1);

    // Handle Next Number
    const handleNext = () => {
        if (currentNumber < arrayOfPages.length) {
            // const nextPage = currentNumber + 1;
            setCurrentNumber(currentNumber +1 );
            getList(5, currentNumber + 1 );
        }
    };
    // Handle Previous Number
    const handlePrev = () => {
        if (currentNumber > 1) {
            // const nextPage = currentNumber - 1;
            setCurrentNumber(currentNumber - 1 );
            getList(5, currentNumber - 1 );
        }
    };

    return <>

        <nav aria-label="Page navigation" className='m-4'>
            <ul className="pagination">
                <li className="page-item">
                    <a className={`page-link ${currentNumber === 1 ? 'disabled' : ''}`} role='button' aria-label="Previous" onClick={handlePrev}>
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                {arrayOfPages?.map((page) => <li role='button' onClick={() => { getList(5, page); setCurrentNumber(page); }} key={page} className={`page-item ${currentNumber === page ? 'active' : ''}`}><a className={"page-link"}>{page}</a></li>)}
                <li className="page-item">
                    <a className={`page-link ${currentNumber === arrayOfPages.length ? 'disabled' : ''}`} role='button' aria-label="Next" onClick={handleNext}>
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>

    </>;
};
