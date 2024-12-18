import React from "react";

const Pagination = ({ page, handleNextPage, handlePreviousPage }) => {
  return (
    <div className="pagination-controls">
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
