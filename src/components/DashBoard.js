import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers, fetchBooks, deleteBook } from "../actions/bookActions";
import {useNavigate } from 'react-router-dom';
import BestSellersList from './BestSellerList';
import MyBooksList from './MyBookList';
import AddBook from './AddBook';
import { logout } from "../actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { userInfo } = useSelector((state) => state.users);
  const { bestSellers, books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    // Fetch user books and best sellers when the dashboard loads
    dispatch(fetchBooks());
    dispatch(fetchBestSellers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleViewBestSellers=()=>{
    navigate('/best-sellers');
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {userInfo ? (
        <div>
          <p>Hello, {userInfo.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

<div className="best-sellers-section">
        <h2>Best Sellers</h2>
        <div className="best-sellers-preview" onClick={handleViewBestSellers}>
          <ul>
            {bestSellers.slice(0, 3).map((book) => (
              <li key={book.primary_isbn13}>
                <h3>{book.title}</h3>
                <img src={book.book_image} alt={book.title} width={80} />
                <p>{book.author}</p>
              </li>
            ))}
          </ul>
          <button>See All</button>
        </div>
      </div>
      <div>
      <h3>Addbook custom book</h3>
      <AddBook /> {/* Render AddBook component here */}
     
      </div>

      <div>
        <h2>My Books</h2>
        <MyBooksList books={books} dispatch={dispatch} />
      </div>
    </div>
  );
};
export default Dashboard;