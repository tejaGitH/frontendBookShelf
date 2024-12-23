import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers, searchBooks } from '../../../actions/bookActions';
import { clearBestSellersSearchResults, clearUserBooksSearchResults } from '../../../reducers/bookReducers';
import './BestSellers.css';

const BestSellers = ({ onSelectBook }) => {
  const dispatch = useDispatch();
  const bestSellers = useSelector((state) => state.books.bestSellers);
  const bestSellersSearchResults = useSelector((state) => state.books.bestSellersSearchResults);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBestSellers());
    return () => dispatch(clearBestSellersSearchResults()); // Clear results on unmount
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) { // Trigger search after typing 3 characters
      dispatch(searchBooks(e.target.value));
    } else if (e.target.value.length === 0) {
      dispatch(clearBestSellersSearchResults()); // Clear results when input is empty
    }
  };

  // Handle search directly in button click
  const handleSearch = () => {
    if (query.length > 2) {
      dispatch(searchBooks(query));
    }
  };

  return (
    <div className="best-sellers">
      <div className="header-container">
        <h3>Best Sellers</h3>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search Best Sellers by author or title..." value={query} onChange={handleSearchChange} />
          <button className="search-button" onClick={handleSearch}>Search</button>
          <button className="clear-button" onClick={() => setQuery('')}>Clear</button>
        </div>
      </div>
      <div className="books-list">
      {(Array.isArray(query.length > 2 ? bestSellersSearchResults : bestSellers) 
  ? (query.length > 2 ? bestSellersSearchResults : bestSellers) 
  : []
).map((book) => (
  <div key={book.rank} className="book-card" onClick={() => onSelectBook(book)}>
    <img src={book.book_image} alt={book.title} />
    <div className="book-info">
      <p><strong>{book.title}</strong></p>
      <p>{book.author}</p>
      <p>Rank: {book.rank}</p>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default BestSellers;