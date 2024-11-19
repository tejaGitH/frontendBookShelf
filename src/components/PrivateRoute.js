import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
   const { isAuthenticated, token,  loading } = useSelector((state) => state.users);
   if(loading){
    return <div>Lopading.......</div>
   }
   //fallback if the user is not authenticated or no token redirect to login
   if(!isAuthenticated || !token){
    return <Navigate to="/login" />;
   }
   return element;
   // return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;