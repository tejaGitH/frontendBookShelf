import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../../actions/bookActions';
import { logout } from '../../actions/userActions';
import { fetchEligibleUsers, sendFriendRequest } from '../../actions/friendshipActions';
import { useNavigate } from 'react-router-dom';
import AddBook from './AddBook';
import BookshelfTable from './BookshelfTable';
import EligibleUsers from '../EligibleUsers';
import Pagination from 'react-paginate';
import SocialUpdates from './SocialUpdates'; // Import the SocialUpdates component
import '../../styles/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.users);
    const { books, loading: booksLoading } = useSelector((state) => state.books);
    const { eligibleUsers, sendingRequest, totalUsers, loading: usersLoading, hasMoreUsers } = useSelector((state) => state.friendships);

    const [localOffset, setLocalOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchBooks());
            dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
        }
    }, [dispatch, userInfo, localOffset]);

    const handleSendFriendRequest = (friendId) => {
        if (!userInfo?.id || !friendId) return;
        console.log('Button clicked. Sending friend request to:', friendId);

        dispatch(sendFriendRequest({ userId: userInfo.id, friendId }))
            .then(() => {
                console.log('Friend request sent successfully');
                dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
            })
            .catch((error) => console.error('Error sending friend request:', error));
    };

    const handlePageChange = ({ selected }) => {
        const newOffset = selected * limit;
        setLocalOffset(newOffset);
        setCurrentPage(selected); // Update the current page
        dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
    };

    if (booksLoading || usersLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            {userInfo && (
                <div>
                    <p>Hello, {userInfo.name}</p>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
            )}

            <div>
                <h2>My Books</h2>
                <BookshelfTable
                    books={books}
                    onEdit={(bookId, updatedData) => dispatch(updateBook(bookId, updatedData))}
                    onDelete={(bookId) => dispatch(deleteBook(bookId))}
                />
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
                        forcePage={currentPage} // Force the selected page
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
                <SocialUpdates /> {/* Add SocialUpdates component */}
            </div>
        </div>
    );
};

export default Dashboard;