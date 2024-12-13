import React from 'react';
import NavBar from '../NavBar/NavBar';
import MyProgress from './MyProgress/MyProgress';
import DashBoardFriendList from './DashBoardFriendList/DashBoardFriendList';
import DashBoardSocialUpdates from './DashBoardSocialUpdates/DashBoardSocialUpdates.jsx';
import Profile from './Profile/Profile';
import DashBoardAddBook from './DashBoardAddBook/DashBoardAddBook.jsx';
import './Dashboard.css';

const Dashboard = () => {
    const handleBookSelect = (book) => {
        console.log('Selected book:', book);
        // Add your logic here to handle book selection
    };

    return (
        <div className="dashboard">
            <div className="navbar-container">
                <NavBar />
            </div>
            <div className="content-container">
                <div className="first-row">
                    <div className="progress-container">
                        <MyProgress onSelectBook={handleBookSelect} />
                    </div>
                    <div className="profile-box">
                        <DashBoardAddBook />
                    </div>
                </div>
                <div className="second-row">
                    <div className="friends-box">
                        <DashBoardFriendList />
                    </div>
                    <div className="updates-box">
                        <DashBoardSocialUpdates />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;