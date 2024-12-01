// src/App.js
// import React from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
// import store from "./utils/store";
// import Navbar from "./components/common/NavBar";
// import LandingPage from "./containers/LandingPage";
// import LoginPage from "./containers/LoginPage";
// import RegisterPage from "./containers/RegisterPage";
// import Dashboard from "./containers/Dashboard";
// import CombinedDataPage from "./containers/CombineDataPage"; // New import for combined data
// import FriendUpdates from "./containers/FriendUpdates"; // Ensure this exists
// import Profile from "./containers/Profile" ;// Ensure this exists
// import ErrorBoundary from "./components/common/ErrorBoundary"; // Import ErrorBoundary
// import PrivateRoute from "./components/common/PrivateRoute"; // Import PrivateRoute
import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store"; // Adjust path to your store file
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import BestSellersPage from "./components/BestSellersPage";
import AvailableUsersPage from "./components/AvailableUsersPage";


const App = () => {

    useEffect(() => { const token = localStorage.getItem('token'); const refreshToken = localStorage.getItem('refreshToken'); console.log('Access Token:', token); console.log('Refresh Token:', refreshToken); // Redirect to login if no tokens are found
         if (!token || !refreshToken) { window.location.href = '/login'; } }, []);

  return (
      <Provider store={store}>
          <Router>
              <ErrorBoundary> {/* Wrap your app with ErrorBoundary
                  {/* <Navbar /> */} 
                  <Routes>
                    {/* public routes */}
                    <Route path="/" element={<LandingPage />} />
                    {/* <Route path="/login" element={<LoginPage />} /> */}

                    {/* protected routes */}
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/best-sellers" element={<PrivateRoute element={<BestSellersPage />} />} />
                    <Route path="/available-users" element={<PrivateRoute element={<AvailableUsersPage />} />} />
                    
                    {/* fallback route */}
                    <Route path="*" element={<Navigate to ="/" />} />
                      {/* <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} /> */}
                      {/* Protecting routes with PrivateRoute */}
                      {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
                      {/* Use CombinedDataPage for combined data view */}
                      {/* <Route path="/combined-data" element={<PrivateRoute element={<CombinedDataPage />} />} />   */}
                      {/* Other routes... */}
                      {/* Redirect unknown routes */}
                      {/* <Route path="*" element={<Navigate to="/" />} /> */}
                  </Routes>
              </ErrorBoundary>
          </Router>
      </Provider>
  );
};

export default App;