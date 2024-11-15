// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../actions/userActions";

// const Register = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(register({ username, email, password })).unwrap();
//             // Redirect or update UI after successful registration
//         } catch (error) {
//             console.error("Registration failed:", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input 
//                 type="text" 
//                 value={username} 
//                 onChange={(e) => setUsername(e.target.value)} 
//                 placeholder="Username" 
//                 required 
//             />
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
//             <button type="submit">Register</button>
//         </form>
//     );
// };
// export default register;

import React, { useState,useContext,useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            setErrorMessage("All fields are required");
            return;
        }
        setLoading(true);
        try {
            setLoading(true);
            // Dispatch the register action and wait for it to complete
            await dispatch(register({ username, email, password })).unwrap();
            alert("Registration successful!");
            navigate('/bookshelf');
            // Optionally redirect or update UI
        } catch (error) {
            console.error("Registration failed:", error);
            // Set error message based on the response
            setErrorMessage(error.response?.data?.message || "Registration failed");
        } finally{
            setLoading(false);
        }
    };

    return (
        <div>
        <h2>Create a New Account</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="true"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={loading}>Register</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
 
    );
};

export default Register;