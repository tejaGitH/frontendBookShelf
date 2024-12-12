import React from 'react';
import NavBar from '../NavBar/NavBar';
import MyProgress from './MyProgress/MyProgress';
import Friends from './Friends/Friends';
import SocialUpdates from './SocialUpdates/SocialUpdates';
import Search from './Search/Search';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="content-container">
                <div className="first-row">
                    <div className="progress-container">
                        <MyProgress />
                    </div>
                    <div className="search-box">
                        <Search />
                    </div>
                </div>
                <div className="second-row">
                    <div className="friends-box">
                        <Friends />
                    </div>
                    <div className="updates-box">
                        <SocialUpdates />
                    </div>
                </div>
            </div>
            <div className="navbar-container">
                <NavBar />
            </div>
        </div>
    );
};

export default Dashboard;
