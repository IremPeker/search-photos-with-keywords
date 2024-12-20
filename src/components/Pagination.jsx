import React from "react";

const Pagination = ({ page, handleNextPage, handlePreviousPage }) => {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-controls__previous-button"
        onClick={handlePreviousPage}
        disabled={page === 1}>
        Previous
      </button>
      <span className="pagination-controls__current-page">Page {page}</span>
      <button
        className="pagination-controls__next-button"
        onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
