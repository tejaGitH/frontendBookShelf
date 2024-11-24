import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBestSellers,
    fetchBooks,
    deleteBook,
    updateBook
} from "../actions/bookActions";
import { logout } from "../actions/userActions";
import {
    getFriendUpdates,
    fetchAvailableUsers,
    sendFriendRequest,
    fetchEligibleUsers
} from "../actions/friendshipActions";
import { useNavigate, useLocation } from "react-router-dom";
import AddBook from "./AddBook";
import ReviewModal from "./ReviewModal";
import BookshelfTable from "./BookshelfTable";
import BestSellersList from "./BestSellerList";
import EligibleUsers from "./EligibleUsers";
import Pagination from "react-paginate";
import SocialUpdates from "./SocialUpdates";
import "./Dashboard.css";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo } = useSelector((state) => state.users);
    const { bestSellers, books, loading: booksLoading, error: booksError } = useSelector((state) => state.books);
    const {
        friendUpdates,
        loading: friendUpdatesLoading,
        error: friendUpdatesError,
        availableUsers,
        loading: availableUsersLoading,
        error: availableUsersError,
        sendingRequest,
        eligibleUsers,
        totalUsers,
        loading: usersLoading,
        hasMoreUsers
    } = useSelector((state) => state.friendships);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [localOffset, setLocalOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchBestSellers());
        dispatch(getFriendUpdates());

        if (location.pathname === "/available-users") {
            dispatch(fetchAvailableUsers({ limit, offset: localOffset, currentUserId: userInfo._id }));
        } else {
            dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
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
                dispatch(fetchAvailableUsers({ limit, offset: localOffset, currentUserId: userInfo.id }));
            })
            .catch((error) => {
                console.error("Error sending friend request:", error);
            });
    };

    const handlePageChange = ({ selected }) => {
        const newOffset = selected * limit;
        setLocalOffset(newOffset);
        setCurrentPage(selected);
        dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
    };

    if (booksLoading || friendUpdatesLoading || availableUsersLoading || usersLoading) return <div>Loading...</div>;
    if (booksError || friendUpdatesError || availableUsersError) return <div>Error: {booksError || friendUpdatesError || availableUsersError}</div>;

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
                <h2>People You May Know</h2>
                <EligibleUsers
                    availableUsers={eligibleUsers}
                    handleSendFriendRequest={handleSendFriendRequest}
                    sendingRequest={sendingRequest}
                />
                {totalUsers > limit && (
                    <Pagination
                        previousLabel='Previous'
                        nextLabel='Next'
                        pageCount={Math.ceil(totalUsers / limit)}
                        forcePage={currentPage}
                        onPageChange={handlePageChange}
                        containerClassName='pagination'
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        activeClassName='active'
                    />
                )}
            </div>

            <div>
                <h2>Social Updates</h2>
                <SocialUpdates />
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
