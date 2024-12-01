// src/components/Bookshelf.js
import React from "react";
import PropTypes from "prop-types";
import BookCard from "./BookCard";

const Bookshelf = ({ books, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bookshelf">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Bookshelf;