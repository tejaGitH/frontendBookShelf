import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/bookshelf">My Bookshelf</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/friend-updates">Friend Updates</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;