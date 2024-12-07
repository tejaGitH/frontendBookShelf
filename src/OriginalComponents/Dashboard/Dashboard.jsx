// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  deleteBook,
  updateBook,
  fetchCurrentBooks
} from "../../actions/bookActions";
import { logout } from "../../actions/userActions";
import {
  sendFriendRequest,
  fetchEligibleUsers,
  removeFriend,
  getFriends
} from "../../actions/friendshipActions";
import { useNavigate } from "react-router-dom";
//import AddBook from "./AddBook";
import EditBookModal from "./EditBookModal";
////import EligibleUsers from "../EligibleUsers";
//import FriendshipOverview from "./FriendshipOverview";
//import CurrentlyReading from "./CurrentlyReading";
import MyProgress from "./MyProgress";
import Search from "./Search";
import Friends from "./Friends";
import SocialUpdates from "./SocialUpdates";
import About from "./About";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.users);
  const { books, loading: booksLoading, error: booksError } = useSelector((state) => state.books);
  const {
    friendUpdates = [],
    friendUpdatesLoading,
    friendUpdatesError,
    eligibleUsers = [],
    eligibleUsersLoading,
    eligibleUsersError,
    totalUsers,
    hasMoreUsers,
    sendingRequest,
    successMessage
  } = useSelector((state) => state.friendships);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookData, setSelectedBookData] = useState(null);
  const [localOffset, setLocalOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (userInfo && initialLoad) {
      console.log("Fetching books and eligible users");
      dispatch(fetchBooks());
      dispatch(fetchCurrentBooks());
      dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
      setInitialLoad(false);
    }
  }, [dispatch, userInfo, localOffset, limit, initialLoad]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEdit = (bookId, bookData) => {
    setSelectedBookId(bookId);
    setSelectedBookData(bookData);
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (bookId, updatedData) => {
    dispatch(updateBook({ bookId, updatedData }));
    setIsEditModalOpen(false);
  };

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleSendFriendRequest = (friendId) => {
    if (!userInfo?.id || !friendId) {
      console.error("Invalid user or friend ID");
      return;
    }
    dispatch(sendFriendRequest({ userId: userInfo.id, friendId }))
      .then(() => {
        dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  const handleRemoveFriend = (friendId) => {
    dispatch(removeFriend({ friendId }))
      .then(() => {
        dispatch(getFriends());
      })
      .catch((error) => {
        console.error("Error removing friend:", error);
      });
  };

  const handlePageChange = ({ selected }) => {
    const newOffset = selected * limit;
    setLocalOffset(newOffset);
    setCurrentPage(selected);
    dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
  };

  const filteredEligibleUsers = eligibleUsers.filter(user => {
    const isPending = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'pending');
    const isAccepted = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'accepted');
    return !isPending && !isAccepted && user._id !== userInfo._id;
  });

  const pageCount = Math.ceil(totalUsers / limit);

  if (booksLoading || friendUpdatesLoading || eligibleUsersLoading) {
    console.log("Loading state detected", booksLoading);
    return <div>Loading...</div>;
  }

  if (booksError || friendUpdatesError || eligibleUsersError) {
    console.log("Error state detected", booksError, friendUpdatesError, eligibleUsersError);
    return <div>Error: {booksError?.message || friendUpdatesError?.message || eligibleUsersError?.message}</div>;
  }

  const ongoingBooks = books.filter(book => book.currentlyReading);
  const finishedBooks = books.filter(book => !book.currentlyReading);

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      {userInfo ? (
        <div>
          <p>Hello, {userInfo.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <div className="first-row">
        <div className="my-progress">
          <MyProgress ongoingBooks={ongoingBooks} finishedBooks={finishedBooks} />
        </div>
        <div className="search">
          <Search />
        </div>
      </div>

      <div className="second-row">
        <div className="friends">
          <Friends />
        </div>
        <div className="social-updates">
          <SocialUpdates />
        </div>
      </div>

      <div className="about">
        <About />
      </div>

      <EditBookModal
        isVisible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bookId={selectedBookId}
        bookData={selectedBookData}
        onUpdate={handleUpdateBook}
      />
    </div>
  );
};

export default Dashboard;
