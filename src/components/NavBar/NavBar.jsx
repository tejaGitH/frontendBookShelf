import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import '../../styles/NavBar.css'; // Ensure you have the styles applied

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="navbar">
            <button onClick={() => navigate('/dashboard')}>Home</button>
            <button onClick={() => navigate('/my-books')}>My Books</button>
            <button onClick={() => navigate('/my-friends')}>My Friends</button>
            <button onClick={() => navigate('/best-sellers')}>Best Sellers</button>
            <button onClick={() => navigate('/social-updates')}>Social Updates</button>
            <button onClick={() => navigate('/about')}>About</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default NavBar;
