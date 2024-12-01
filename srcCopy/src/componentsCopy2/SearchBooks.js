// src/components/SearchBooks.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBooks } from '../actions/bookActions';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchBooks(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBooks;