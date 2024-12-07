import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <button onClick={() => navigate('/dashboard')}>Home</button>
            <button onClick={() => navigate('/my-books')}>My Books</button>
            <button onClick={() => navigate('/my-friends')}>My Friends</button>
            <button onClick={() => navigate('/best-sellers')}>Best Sellers</button>
            <button onClick={() => navigate('/social-updates')}>Social Updates</button>
            <button onClick={() => navigate('/about')}>About</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
    );
};

export default NavBar;
