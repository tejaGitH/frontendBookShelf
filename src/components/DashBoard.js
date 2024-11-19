// src/components/Dashboard.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../actions/userActions";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.users); // Get user info from Redux
  const dispatch = useDispatch();
  console.log(userInfo);

  const handleLogout = () =>{
    dispatch(logout());
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {userInfo ? (
        <div>
          <p>Hello, {userInfo.name}</p>
          <button onClick={handleLogout}>Logout</button>
          {/* You can add more user-specific data here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;