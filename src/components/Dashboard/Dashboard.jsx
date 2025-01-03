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
            <div className="content-container">
                <div className="first-row">
                    <div className="progress-container">
                        <h3>My Progress</h3>
                        <div className="scroll-content">
                            <MyProgress onSelectBook={handleBookSelect} />
                        </div>
                    </div>
                    <div className="profile-box">
                        <h3>Add a Book</h3>
                        <div className="scroll-content">
                            <DashBoardAddBook />
                        </div>
                    </div>
                </div>
                <div className="second-row">
                    <div className="friends-box">
                        <h3>My Friends</h3>
                        <div className="scroll-content">
                            <DashBoardFriendList />
                        </div>
                    </div>
                    <div className="updates-box">
                        <h3>Social Updates</h3>
                        <div className="scroll-content">
                            <DashBoardSocialUpdates />
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default Dashboard;