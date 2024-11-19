// src/components/common/SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search books..."
            />
        </div>
    );
};

export default SearchBar;