import React from 'react';
import NavBar from '../NavBar/NavBar';
import MyProgress from './MyProgress/MyProgress';
import Search from './Search/Search';
import Friends from './Friends/Friends';
import SocialUpdates from './SocialUpdates/SocialUpdates';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="content-container">
        <div className="first-row">
          <div className="box my-progress-container">
            <MyProgress />
          </div>
          <div className="box search-container">
            <Search />
          </div>
        </div>
        <div className="second-row">
          <div className="box friends-container">
            <Friends />
          </div>
          <div className="box social-updates-container">
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
