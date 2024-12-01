import React from 'react';
import './BestSellers.css';

const BestSellers = ({ bestSellers }) => {
    return (
        <div className="best-sellers">
            <h1>Best Sellers</h1>
            <div className="bestseller-list">
                {bestSellers.map((book) => (
                    <div key={book.id} className="bestseller-item">
                        <img src={book.coverImage} alt={book.title} />
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;