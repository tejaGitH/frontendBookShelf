import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import "../../styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar className="navbar-custom flex-column" fixed="right">
      <Nav className="flex-column">
        <Nav.Link
          className={`nav-link-custom ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          className={`nav-link-custom ${isActive("/my-books") ? "active" : ""}`}
          onClick={() => navigate("/my-books")}
        >
          My Books
        </Nav.Link>
        <Nav.Link
          className={`nav-link-custom ${isActive("/my-friends") ? "active" : ""}`}
          onClick={() => navigate("/my-friends")}
        >
          My Friends
        </Nav.Link>
        <Nav.Link
          className={`nav-link-custom ${isActive("/social-updates") ? "active" : ""}`}
          onClick={() => navigate("/social-updates")}
        >
          Social Updates
        </Nav.Link>
        <Nav.Link className="nav-link-custom" onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;