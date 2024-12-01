import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userActions'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password }));
            // Redirect to Dashboard or Bookshelf after successful login
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
                <div className="social-login">
                    {/* Add social login buttons here */}
                    <button>Login with Google</button>
                    <button>Login with Facebook</button>
                </div>
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
    );
};

export default LoginPage;