import React from "react";
import  { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Route, Navigate, Routes} from "react-router-dom";
import store from "./utils/store";
import BookShelf from './components/BookShelf';
import Login from "./components/Login";
import Register from "./components/Register";

const App =()=>{

  const {isAuthenticated }= useSelector((state)=>state.users);

  return(
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/login" element={isAuthenticated? <Navigate to="/bookshelf"/>: <Login/>}/>
          <Route path="/register" element= {isAuthenticated? <Navigate to="/bookshelf"/>: <Register/>}/> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookshelf" element={isAuthenticated? <BookShelf /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="bookshelf"/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;






  //const dispatch = useDispatch;
 // const[isAuthenticated, setIsAuthenticated]=useState(false);
  // const isAuthenticated =useSelector((state)=> state.users.isAuthenticated);
  // const =>{
  //   // let tokenExist = Cookies.get("token");
  //    console.log(localStorage.getItem("token")?true:false);
  //   // return tokenExist?true:false;
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));



  // // Function to handle setting authentication, e.g., after login
  // const checkAuthentication = () => {
  //     const token = localStorage.getItem('token');
  //     setIsAuthenticated(!!token);
  // };

  // // Use effect to listen to any changes in authentication status
  // useEffect(() => {
  //     // Set initial auth state on component mount
  //     checkAuthentication();
  //     // Optional: Add an event listener for changes in localStorage (useful if other tabs change auth status)
  //     const handleStorageChange = () => checkAuthentication();
  //     window.addEventListener('storage', handleStorageChange);
  //     // Cleanup on component unmount
  //     return () => {
  //         window.removeEventListener('storage', handleStorageChange);
  //     };
  // }, []);