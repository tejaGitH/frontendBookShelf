import React from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <Link to="/bookshelf">My Bookshelf</Link>
                <Link to="/best-sellers">Best Sellers</Link>
                <Link to="/friend-updates">Friend Updates</Link>
            </nav>

            {/* Currently Reading Section */}
            <section className="currently-reading">
                <h3>Currently Reading</h3>
                {/* Add logic to display currently reading books */}
            </section>

            {/* Friend Activity Section */}
            <section className="friend-activity">
                <h3>Friend Activity</h3>
                {/* Add logic to display friends' activities */}
            </section>

            {/* Pending Requests Section */}
            <section className="pending-requests">
                <h3>Pending Friend Requests</h3>
                {/* Add logic to display pending requests */}
            </section>
        </div>
    );
};

export default Dashboard;