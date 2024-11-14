// src/components/BestSellers.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link to enable navigation
import { getBooks } from '../actions/bookActions';

const BestSellers = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooks()); // Fetch the best sellers when the component mounts
    }, [dispatch]);

    if (loading) return <p>Loading best sellers...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Best Sellers</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.isbn}>
                        {/* Link to the BookDetails page, passing ISBN as part of the URL */}
                        <Link to={`/book-details/${book.isbn}`}>
                            <h3>{book.title}</h3>
                        </Link>
                        <p>Author: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BestSellers;