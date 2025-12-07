"use client";

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pages.push(
      <button key="1" className="page-btn" onClick={() => onPageChange(1)}>
        1
      </button>
    );
    if (startPage > 2) pages.push(<span key="dots1"> ... </span>);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`page-btn ${i === currentPage ? "active" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push(<span key="dots2"> ... </span>);
    pages.push(
      <button
        key={totalPages}
        className="page-btn"
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pages}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
