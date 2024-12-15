import React from 'react';
import './BestSellers.css';

const BestSellers = ({ onSelectBook }) => {
  const bestSellers = useSelector(state => state.books.bestSellers);

  return (
    <div className="best-sellers">
      <h1>Best Sellers</h1>
      <div className="bestseller-list">
        {bestSellers.map((book) => (
          <div key={book._id} className="bestseller-item" onClick={() => onSelectBook(book)}>
            <p>{book.title}</p>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;