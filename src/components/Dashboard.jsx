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
    fetchEligibleUsers,
    fetchSocialUpdates,
    removeFriend,
    getFriends,
} from "../actions/friendshipActions";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import EditBookModal from "./EditBookModal";
import BookshelfTable from "./BookshelfTable";
import EligibleUsers from "./EligibleUsers";
import SocialUpdates from "./SocialUpdates";
import FriendshipOverview from "./FriendshipOverview";
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
        successMessage,
        updates,
        socialUpdatesLoading,
        error: socialUpdatesError
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
            dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
            dispatch(getFriendUpdates());
            //dispatch(fetchSocialUpdates());
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
        .then(()=>{
            dispatch(fetchEligibleUsers({limit, offset: localOffset}))
        })
        .catch((error) => {
            console.error("Error sending friend request:", error);
        });
    };

    const handleRemoveFriend = (friendId) => { 
    dispatch(removeFriend({ friendId }))
    .then(() => {
         dispatch(getFriends()); // Update friends list after removal 
    }) 
    .catch((error) => { 
    console.error("Error removing friend:", error); 
  });
}
    const handlePageChange = ({ selected }) => {
        //if (selected < 0 || (!hasMoreUsers && selected > currentPage)) return; // Prevent invalid page changes
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

    if (booksLoading || friendUpdatesLoading || eligibleUsersLoading || socialUpdatesLoading) {
        console.log("Loading state detected");
        return <div>Loading...</div>;
    }

    if (booksError || friendUpdatesError || eligibleUsersError || socialUpdatesError) {
        console.log("Error state detected", booksError, friendUpdatesError, eligibleUsersError, socialUpdatesError);
        return <div>Error: {booksError?.message || friendUpdatesError?.message || eligibleUsersError?.message || socialUpdatesError?.message}</div>;
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
                    availableUsers={filteredEligibleUsers}
                    handleSendFriendRequest={handleSendFriendRequest}
                    sendingRequest={sendingRequest}
                    totalUsers={totalUsers}
                    
                    // currentPage={currentPage}
                    // onPageChange={handlePageChange}
                />
                {successMessage && <div className="alert-success">{successMessage}</div>}
                <div className="pagination-buttons"> 
                    <button onClick={() => handlePageChange({selected: currentPage-1})} disabled={currentPage === 0}>Previous
                    </button> <button onClick={() => handlePageChange({selected: currentPage + 1})} disabled={!hasMoreUsers}>Next</button> </div>
            </div>

            {/* <div>
                <h2>Social Updates</h2>
                <SocialUpdates updates={updates} />
            </div> */}
            <div> <h2>Friendship Overview</h2> <FriendshipOverview onRemoveFriend={handleRemoveFriend} /> </div>

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
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchBooks,
//     deleteBook,
//     updateBook
// } from "../actions/bookActions";
// import { logout } from "../actions/userActions";
// import {
//     getFriendUpdates,
//     sendFriendRequest,
//     fetchEligibleUsers,
//     fetchSocialUpdates
// } from "../actions/friendshipActions";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";
// import EditBookModal from "./EditBookModal";
// import BookshelfTable from "./BookshelfTable";
// import EligibleUsers from "./EligibleUsers";
// import SocialUpdates from "./SocialUpdates";
// import FriendshipOverview from "./FriendshipOverview";
// import "./Dashboard.css";

// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { userInfo } = useSelector((state) => state.users);
//     const { books, loading: booksLoading, error: booksError } = useSelector((state) => state.books);
//     const {
//         friendUpdates,
//         friendUpdatesLoading,
//         friendUpdatesError,
//         eligibleUsers,
//         eligibleUsersLoading,
//         eligibleUsersError,
//         totalUsers,
//         hasMoreUsers,
//         sendingRequest,
//         successMessage,
//         updates,
//         socialUpdatesLoading,
//         error: socialUpdatesError
//     } = useSelector((state) => state.friendships);

//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedBookId, setSelectedBookId] = useState(null);
//     const [selectedBookData, setSelectedBookData] = useState(null);
//     const [localOffset, setLocalOffset] = useState(0);
//     const [limit, setLimit] = useState(5);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [initialLoad, setInitialLoad] = useState(true);

//     useEffect(() => {
//         if (userInfo && initialLoad) {
//             console.log("Fetching books and eligible users");
//             dispatch(fetchBooks());
//             dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
//             dispatch(getFriendUpdates());
//             dispatch(fetchSocialUpdates());
//             setInitialLoad(false);
//         }
//     }, [dispatch, userInfo, localOffset, limit, initialLoad]);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate("/login");
//     };

//     const handleEdit = (bookId, bookData) => {
//         setSelectedBookId(bookId);
//         setSelectedBookData(bookData);
//         setIsEditModalOpen(true);
//     };

//     const handleUpdateBook = (bookId, updatedData) => {
//         dispatch(updateBook({ bookId, updatedData }));
//         setIsEditModalOpen(false);
//     };

//     const handleDelete = (bookId) => {
//         dispatch(deleteBook(bookId));
//     };

//     const handleSendFriendRequest = (friendId) => {
//         if (!userInfo?.id || !friendId) {
//             console.error("Invalid user or friend ID");
//             return;
//         }
//         dispatch(sendFriendRequest({ userId: userInfo.id, friendId }))
//             .then(() => {
//                 dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
//             })
//             .catch((error) => {
//                 console.error("Error sending friend request:", error);
//             });
//     };

//     const handlePageChange = (selected) => {
//         if (selected < 0 || !hasMoreUsers && selected > currentPage) return; // Prevent invalid page changes
//         const newOffset = selected * limit;
//         setLocalOffset(newOffset);
//         setCurrentPage(selected);
//         dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
//     };

//     const filteredEligibleUsers = eligibleUsers.filter(user => {
//         const isPending = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'pending');
//         const isAccepted = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'accepted');
//         return !isPending && !isAccepted && user._id !== userInfo._id;
//     });

//     if (booksLoading || friendUpdatesLoading || eligibleUsersLoading || socialUpdatesLoading) {
//         console.log("Loading state detected");
//         return <div>Loading...</div>;
//     }

//     if (booksError || friendUpdatesError || eligibleUsersError || socialUpdatesError) {
//         console.log("Error state detected", booksError, friendUpdatesError, eligibleUsersError, socialUpdatesError);
//         return <div>Error: {booksError?.message || friendUpdatesError?.message || eligibleUsersError?.message || socialUpdatesError?.message}</div>;
//     }

//     return (
//         <div>
//             <h1>Welcome to your Dashboard</h1>
//             {userInfo ? (
//                 <div>
//                     <p>Hello, {userInfo.name}</p>
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             ) : (
//                 <p>Loading user data...</p>
//             )}

//             <div>
//                 <h3>Add Custom Book</h3>
//                 <AddBook />
//             </div>

//             <div>
//                 <h2>My Books</h2>
//                 <BookshelfTable
//                     books={books}
//                     onEdit={handleEdit}
//                     onDelete={handleDelete}
//                 />
//             </div>

//             <div>
//                 <h2>People You May Know</h2>
//                 <EligibleUsers
//                     availableUsers={filteredEligibleUsers}
//                     handleSendFriendRequest={handleSendFriendRequest}
//                     sendingRequest={sendingRequest}
//                 />
//                 {successMessage && <div className="alert-success">{successMessage}</div>}
//                 <div className="pagination-buttons">
//                     <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
//                     <button onClick={() => handlePageChange(currentPage + 1)} disabled={!hasMoreUsers}>Next</button>
//                 </div>
//             </div>

//             <div>
//                 <h2>Social Updates</h2>
//                 <SocialUpdates updates={updates} />
//             </div>

//             <div>
//                 <h2>Friendship Overview</h2>
//                 <FriendshipOverview />
//             </div>

//             <EditBookModal
//                 isVisible={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 bookId={selectedBookId}
//                 bookData={selectedBookData}
//                 onUpdate={handleUpdateBook}
//             />
//         </div>
//     );
// };

// export default Dashboard;
