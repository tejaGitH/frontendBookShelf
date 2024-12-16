import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import '../../styles/NavBar.css';

const NavBar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Function to determine if a button is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="">
      <div className="navbar">
        <button
          className={isActive('/dashboard') ? 'active' : ''}
          onClick={() => navigate('/dashboard')}
        >
          Home
        </button>
        <button
          className={isActive('/my-books') ? 'active' : ''}
          onClick={() => navigate('/my-books')}
        >
          My Books
        </button>
        <button
          className={isActive('/my-friends') ? 'active' : ''}
          onClick={() => navigate('/my-friends')}
        >
          My Friends
        </button>
        <button
          className={isActive('/social-updates') ? 'active' : ''}
          onClick={() => navigate('/social-updates')}
        >
          Social Updates
        </button>
       
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* <div className="main-content">{children}</div> */}
    </div>
  );
};

export default NavBar;