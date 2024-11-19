import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import './RegisterPage.css';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
        // Handle success/error messages here
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
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
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
};

export default RegisterPage;