// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../actions/userActions";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
    
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(login({ email, password })).unwrap(); // Use unwrap to handle errors directly
//             // Redirect or update UI after successful login
//         } catch (error) {
//             console.error("Login failed:", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 placeholder="Email" 
//                 required 
//             />
//             <input 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 placeholder="Password" 
//                 required 
//             />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import { useRouter } from "next/router";
// import Link from "next/link"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const {isAuthenticated}= useSelector((state)=> state.users);
    

     const { isAuthenticated, loading, error} =useSelector((state)=>state.users);

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(login({email,password}));
    }
    useEffect(()=>{
        if (isAuthenticated){
            navigate('/bookshelf');
        }
    }, [isAuthenticated,navigate,error])
  

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>Login</button>
            {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;




   // const resultAction = await dispatch(login({ email, password })).unwrap();
            // console.log("Dispatch result:", resultAction); // Log the result of dispatc
            // console.log(resultAction.user.token);
            // if (resultAction.success) {
            //     alert('Login successful!');
            //     localStorage.setItem('token', resultAction.user.token); // Store token
            //     //console.log(resultAction.user.token);
            //     navigate("/bookshelf");//navigate to home page
            //     console.log("bookShelfnavigate"+navigate("/bookShelf"));
            //     console.log("/navigting to bookshelf");
            // }
            // await dispatch(login({ email, password })).unwrap();

            // const handleSubmit = async (e) => {
            //     e.preventDefault();
            //     try {
                 
            //         const token = 'dummy-token';
            //         localStorage.setItem('token', token); // Temporary token for testing
            //         setIsAuthenticated(true);//
            //         navigate("/bookshelf"); // Should redirect regardless of login result
                
            //     } catch (error) {
            //         console.error("Login failed:", error);
            //         setErrorMessage(error.response?.data?.message || "Login failed due to network error.");
            //     }
            // };