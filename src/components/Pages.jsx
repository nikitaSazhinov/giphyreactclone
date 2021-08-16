import React from 'react';

const Pages = (props) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalItems/props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return <nav > 
        <ul className="pagination pagination-sm justify-content-end border-0">
            {pageNumbers.map(number => {
                let classes = "page-item "
                if (number === props.currPage) {
                    classes += "active"
                }

                return (
                    <li className={classes}>
                        <a href="#" className="page-link" onClick ={ () => props.pageSelected(number)}>{number}</a>
                    </li>
                )
            })}
        </ul>
    </nav>
}

export default Pages;