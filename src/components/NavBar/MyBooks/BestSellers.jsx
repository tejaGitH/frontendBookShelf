import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers } from '../../../actions/bookActions';
import './BestSellers.css';

const BestSellers = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const bestSellers = useSelector((state) => state.books.bestSellers);

    useEffect(() => {
        dispatch(fetchBestSellers());
    }, [dispatch]);

    return (
        <div className="best-sellers">
            <h3>Best Sellers</h3>
            <div className="books-list">
                {bestSellers.map((book) => (
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
