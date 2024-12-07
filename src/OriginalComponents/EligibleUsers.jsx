import React from 'react';
import Pagination from 'react-paginate';

const EligibleUsers = ({
    availableUsers,
    handleSendFriendRequest,
    sendingRequest,
    totalUsers,
    currentPage,
    onPageChange,
}) => {
    const limit = 5; // assuming 5 users per page
    const pageCount = Math.ceil(totalUsers / limit);

    const onFriendRequestClick = (e, userId) => {
        e.preventDefault(); // Prevent default action
        handleSendFriendRequest(userId);
    };

    return (
        <div>
            <h2>Our Community</h2>
            {console.log("availableUsers", availableUsers)}
            <ul>
                {availableUsers.map((user) => (
                    <li key={user._id}>
                        <p>
                            <strong>{user.username}</strong> ({user.email})
                        </p>
                        <button
                            onClick={(e) => onFriendRequestClick(e, user._id)}
                            disabled={sendingRequest}
                        >
                            {sendingRequest
                                ? 'Sending Friend Request...'
                                : 'Send Friend Request'}
                        </button>
                    </li>
                ))}
            </ul>
            {availableUsers.length === 0 && <p>No available users to display.</p>}
            {pageCount > 1 && (
                <Pagination
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={onPageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={currentPage}
                />
            )}
        </div>
    );
};

export default EligibleUsers;
