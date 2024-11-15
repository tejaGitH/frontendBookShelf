//displays profile, their bookShelf possib;ly list of their reviews
// src/components/ProfilePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserBooks } from '../actions/userActions';
import BookCard from './BookCard';
import AddBook from './AddBook';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userProfile, userBooks, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUserProfile()); // Fetch user profile
    dispatch(getUserBooks());   // Fetch user's books
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{userProfile.name}'s Profile</h1>
      <h2>My Bookshelf</h2>
      <AddBook />
      <div>
        {userBooks.length > 0 ? (
          userBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;