import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellers, fetchBooks, deleteBook, updateBook } from "../actions/bookActions";
import { logout } from "../actions/userActions";
import { getFriendUpdates, fetchAvailableUsers, sendFriendRequest } from "../actions/friendshipActions";
import { useNavigate, useLocation } from "react-router-dom";
import BestSellersList from "./BestSellerList";
import AddBook from "./AddBook";
import ReviewModal from "./ReviewModal";
import BookshelfTable from "./BookshelfTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.users);
  
  const { bestSellers, books, loading, error } = useSelector((state) => state.books);
  const { friendUpdates, friendUpdatesLoading, friendUpdatesError, availableUsers, availableUsersLoading, availableUsersError, sendingRequest } = useSelector((state) => state.friendships);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [limit] = useState(5); // Define the limit for available users
  const [offset, setOffset] = useState(0); // Offset can be managed depending on the pagination strategy

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchBestSellers());
    dispatch(getFriendUpdates());

    // Only fetch available users when on the available-users page
    if (location.pathname === "/available-users") {
      dispatch(fetchAvailableUsers({ limit, offset, currentUserId: userInfo._id }));
    }
  }, [dispatch, location.pathname, limit, offset, userInfo._id]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleViewBestSellers = () => {
    navigate("/best-sellers");
  };

  const handleEdit = (bookId, updatedData) => {
    dispatch(updateBook(bookId, updatedData));
  };

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleReview = (bookId) => {
    setSelectedBookId(bookId);
    setIsReviewModalOpen(true);
  };

  const handleSendFriendRequest = (friendId) => {
    if (!userInfo?.id || !friendId) {
      console.error("Invalid user or friend ID");
      return;
    }
    dispatch(sendFriendRequest({ userId: userInfo.id, friendId }))
      .then(() => {
        dispatch(fetchAvailableUsers({ limit, offset, currentUserId: userInfo.id }));
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  if (loading || friendUpdatesLoading || availableUsersLoading) return <div>Loading...</div>;
  if (error || friendUpdatesError || availableUsersError) return <div>Error: {error || friendUpdatesError || availableUsersError}</div>;

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
        <h3>Add Custom Book</h3>
        <AddBook />
      </div>

      <div>
        <h2>My Books</h2>
        <BookshelfTable
          books={books}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReview={handleReview}
        />
      </div>

      <div>
        <h2>Friend Updates (Reviews)</h2>
        <ul>
          {(friendUpdates && Array.isArray(friendUpdates)) ? (
            friendUpdates.map((update) => (
              <li key={update._id}>
                <p><strong>{update.user.username}</strong> reviewed <strong>{update.book.title}</strong></p>
                <p>Rating: {update.rating}</p>
                <p>{update.review}</p>
              </li>
            ))
          ) : (
            <p>No friend updates available</p>
          )}
        </ul>
      </div>

      <div>
        <h2>Our Community</h2>
        <ul>
          {availableUsers.slice(0, 5).map((user) => (
            <li key={user._id}>
              <p>
                <strong>{user.username}</strong> ({user.email})
              </p>
              <button 
                onClick={() => handleSendFriendRequest(user._id)} 
                disabled={sendingRequest}
              >
                {sendingRequest ? "Sending Friend Request..." : "Send Friend Request"}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/available-users")}>View All Users</button>
      </div>

      <ReviewModal
        isVisible={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        bookId={selectedBookId}
      />
    </div>
  );
};

export default Dashboard;