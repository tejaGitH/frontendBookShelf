import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
   return (
       <nav className="navbar">
           {/* Logo or Title */}
           <Link to="/">Bookshelf</Link>

           {/* Navigation Links */}
           <ul className="nav-links">
               <li><Link to="/bookshelf">My Bookshelf</Link></li>
               <li><Link to="/best-sellers">Best Sellers</Link></li>
               <li><Link to="/friend-updates">Friend Updates</Link></li>
               {/* Add more links as needed */}
               {/* Logout logic can be added here as well */}
           </ul>
       </nav>
   );
};

export default NavBar;