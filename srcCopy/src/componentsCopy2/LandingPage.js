import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import your CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav className="navbar">
                <h1>Bookshelf</h1>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
            <div className="welcome-message">
                <h2>Welcome to Bookshelf!</h2>
                <p>Your personal space to curate and share your favorite books.</p>
                <div className="cta-buttons">
                    <Link to="/login" className="btn">Get Started</Link>
                    <Link to="/register" className="btn">Join Us</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;