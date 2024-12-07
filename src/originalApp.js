import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import BestSellersPage from "./components/BestSellersPage";
import AvailableUsersPage from "./components/AvailableUsersPage";
import CurrentlyReading from "./components/Dashboard/CurrentlyReading";
import BookCard from "./components/Dashboard/BookCard";
import About from "./components/Dashboard/About";
import NavBar from "./components/common/NavBar";
import MyBooks from "./components/NavBar/MyBooks";
import MyFriends from "./components/NavBar/MyFriends";
import SocialUpdates from "./components/Dashboard/SocialUpdates";
import Profile from "./components/NavBar/Profile";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <NavBar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}

            {/* Protected routes */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/currently-reading" element={<PrivateRoute element={<CurrentlyReading />} />} />
            <Route path="/book/:bookId" element={<PrivateRoute element={<BookCard />} />} />
            <Route path="/best-sellers" element={<PrivateRoute element={<BestSellersPage />} />} />
            <Route path="/available-users" element={<PrivateRoute element={<AvailableUsersPage />} />} />
            <Route path="/my-books" element={<PrivateRoute element={<MyBooks />} />} />
            <Route path="/my-friends" element={<PrivateRoute element={<MyFriends />} />} />
            <Route path="/social-updates" element={<PrivateRoute element={<SocialUpdates />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/about" element={<About />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
