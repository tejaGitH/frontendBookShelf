// src/containers/CombinedDataPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBestSellers, fetchBooks } from '../actions/bookActions';
import { getFriendUpdates } from '../actions/friendshipActions';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Adjust import path
import SearchBar from '../components/common/SearchBar'; // Adjust import path
//import './CombinedDataPage.css';

const CombinedDataPage = () => {
    const dispatch = useDispatch();
    const [bestSellers, setBestSellers] = useState([]);
    const [userBooks, setUserBooks] = useState([]);
    const [friendUpdates, setFriendUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bestSellersResponse = await dispatch(fetchBestSellers());
                setBestSellers(bestSellersResponse);
                
                const userBooksResponse = await dispatch(fetchBooks());
                setUserBooks(userBooksResponse);
                
                const friendUpdatesResponse = await dispatch(getFriendUpdates());
                setFriendUpdates(friendUpdatesResponse);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="combined-data-page">
            <h1>Combined Data</h1>
            <SearchBar query={searchQuery} onSearch={setSearchQuery} />

            {/* Best Sellers Section */}
            <section>
                <h2>Best Sellers</h2>
                <div className="bestseller-list">
                    {bestSellers.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())).map((book) => (
                        <div key={book.id} className="bestseller-item">
                            <img src={book.coverImage} alt={book.title} />
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* User Books Section */}
            <section>
                <h2>My Books</h2>
                {userBooks.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())).map((book) => (
                    <div key={book._id}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                ))}
            </section>

            {/* Friend Updates Section */}
            <section>
                <h2>Friend Updates</h2>
                {friendUpdates.map((update) => (
                    <div key={update.id} className="update-card">
                        <p>{update.friendName} reviewed "{update.bookTitle}"</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default CombinedDataPage;