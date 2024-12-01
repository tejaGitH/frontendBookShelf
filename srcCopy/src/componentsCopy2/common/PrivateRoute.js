// src/components/common/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
   const { isAuthenticated } = useSelector((state) => state.users);
   return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;