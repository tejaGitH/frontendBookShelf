// src/components/BestSellersPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBestSellers } from '../actions/bookActions';

const BestSellersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bestSellers, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if(!bestSellers){ //check if best-sellers is empty
        dispatch(fetchBestSellers());
    } 
  }, [dispatch, bestSellers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Best Sellers</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <ul>
        {bestSellers.map((book) => (
          <li key={book.primary_isbn13}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <img src={book.book_image} alt={book.title} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellersPage;