//SocialCard
//edit //delete //addbook

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBooks,
    deleteBook,
    updateBook
} from "../actions/bookActions";
import { logout } from "../actions/userActions";
import {
    getFriendUpdates,
    sendFriendRequest,
    fetchEligibleUsers
} from "../actions/friendshipActions";
import { useNavigate, useLocation, useAsyncValue } from "react-router-dom";
import AddBook from "./AddBook";
import EditBookModal from "./EditBookModal";
import BookshelfTable from "./BookshelfTable";
import EligibleUsers from "./EligibleUsers";
import Pagination from "react-paginate";
import SocialUpdates from "./SocialUpdates";
import "./Dashboard.css";


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.users);
    const { books, loading: booksLoading, error: booksError } = useSelector((state) => state.books);
    const {
        friendUpdates,
        friendUpdatesLoading,
        friendUpdatesError,
        eligibleUsers,
        eligibleUsersLoading,
        eligibleUsersError,
        totalUsers,
        hasMoreUsers,
        sendingRequest,
    } = useSelector((state) => state.friendships);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBookData, setSelectedBookData] = useState(null);
    const [localOffset, setLocalOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (userInfo) {
            console.log("Fetching books and eligible users");
            dispatch(fetchBooks());
            dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
            dispatch(getFriendUpdates());
        }
    }, [dispatch, userInfo, localOffset, limit]);

    const handleLogout = () => {
        dispatch(logout());
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

    const handlePageChange = ({ selected }) => {
        const newOffset = selected * limit;
        setLocalOffset(newOffset);
        setCurrentPage(selected);
        dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
    };

    const pageCount = Math.ceil(totalUsers / limit);

    if (booksLoading || friendUpdatesLoading || eligibleUsersLoading) {
        console.log("Loading state detected");
        return <div>Loading...</div>;
    }

    if (booksError || friendUpdatesError || eligibleUsersError) {
        console.log("Error state detected", booksError, friendUpdatesError, eligibleUsersError);
        return <div>Error: {booksError?.message || friendUpdatesError?.message || eligibleUsersError?.message}</div>;
    }

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
                />
            </div>
            <div>
                <h2>People You May Know</h2>
                <EligibleUsers
                    availableUsers={eligibleUsers}
                    handleSendFriendRequest={handleSendFriendRequest}
                    sendingRequest={sendingRequest}
                />
                {hasMoreUsers && totalUsers > 0 && (
                    <Pagination
                        previousLabel='Previous'
                        nextLabel='Next'
                        pageCount={pageCount}
                        forcePage={currentPage < pageCount ? currentPage : 0}
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