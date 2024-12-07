import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


// export default PrivateRoute;
const PrivateRoute = ({ element }) => {
   const { token, loading } = useSelector((state) => state.users);
 
   if (loading) {
     return <div>Loading...</div>; // Show loading while checking user data
   }
 
   if (!token) {
     return <Navigate to="/login" />; // Redirect to login if no token (unauthenticated)
   }
 
   return element; // Render the protected component if authenticated
 };
 
 export default PrivateRoute;