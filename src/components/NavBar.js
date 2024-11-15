import React from 'react';
import { Link, NavLink } from 'react-router-dom';
//import './NavBar.css'; // Optional: Add styling here

const NavBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Bookshelf</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" exact className="nav-item" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookshelf" className="nav-item" activeClassName="active">
            My Bookshelf
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="nav-item" activeClassName="active">
            Search
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/profile" className="nav-item" activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-item logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="nav-item" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;