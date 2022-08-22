import React from "react";

const PaginationTodo = ({ todoPerPage, totalTodo, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTodo / todoPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pageNumbers.map((number) => {
            return (
              <>
                <li className="page-item">
                  <a
                    onClick={() => paginate(number)}
                    href="#"
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default PaginationTodo;
