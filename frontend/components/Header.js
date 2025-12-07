"use client";

import React, { useState, useEffect } from "react";

const Header = ({ onSearch, searchValue }) => {
  const [term, setTerm] = useState(searchValue || "");

  useEffect(() => {
    if (searchValue !== undefined) {
      setTerm(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(term);
    }, 500);
    return () => clearTimeout(timer);
  }, [term, onSearch]);

  return (
    <header className="top-bar">
      <h1>Sales Management System</h1>

      <div className="search-container">
        <i className="bi bi-search search-icon"></i>
        <input
          type="text"
          id="searchInput"
          placeholder="Name, Phone no."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
