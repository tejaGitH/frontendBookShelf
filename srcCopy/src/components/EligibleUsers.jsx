import React from 'react';
import Pagination from 'react-paginate';

const EligibleUsers = ({
    availableUsers,
    handleSendFriendRequest,
    handleCancelFriendRequest,
    sendingRequest,
    totalUsers,
    currentPage,
    onPageChange,
}) => {
    const limit = 5; // assuming 5 users per page
    const pageCount = Math.ceil(totalUsers / limit);

    if (!availableUsers || availableUsers.length === 0) {
        return <p>No eligible users found.</p>;
    }

    return (
        <div>
            <h2>Our Community</h2>
            <ul>
                {availableUsers.map((user) => (
                    <li key={user._id}>
                        <p>
                            <strong>{user.username}</strong> ({user.email})
                        </p>
                        <button
                            onClick={() => handleSendFriendRequest(user._id)}
                            disabled={sendingRequest}
                        >
                            {sendingRequest
                                ? 'Sending Friend Request...'
                                : 'Send Friend Request'}
                        </button>
                        <button
                            onClick={() => handleCancelFriendRequest(user._id)}
                            disabled={sendingRequest}
                        >
                            {sendingRequest
                                ? 'Canceling Friend Request...'
                                : 'Cancel Friend Request'}
                        </button>
                    </li>
                ))}
            </ul>
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
