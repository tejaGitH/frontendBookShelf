import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import { fetchSocialUpdates  } from '../../../actions/friendshipActions';
import {fetchFriendsBooks, fetchBooks} from '../../../actions/bookActions'
import SocialUpdates from './SocialUpdates';
import Books from './Books';
import './SocialUpdatesPage.css';



const SocialUpdatesPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSocialUpdates());
        dispatch(fetchFriendsBooks());
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div className="social-updates-page">
            <div className="content-container">
                <div className="main-content">
                    <div className="left-content">
                        <SocialUpdates />
                    </div>
                    <div className="right-content">
                        <Books />
                    </div>
                </div>
            </div>
            <div className="navbar-container">
                <NavBar />
            </div>
        </div>
    );
};

export default SocialUpdatesPage;
