//allows users to search books from 3rd oparty apis
// src/components/SearchPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks } from '../actions/bookActions';
import BookCard from './BookCard';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state.books);

  const handleSearch = () => {
    dispatch(searchBooks(query));
  };

  return (
    <div>
      <h1>Search for Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.isbn} book={book} />)
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;