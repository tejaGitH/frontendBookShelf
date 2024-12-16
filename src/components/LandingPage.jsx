import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [isLogin, setIsLogin] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isLogin) {
                const resultAction = await dispatch(register({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                }));
                if (register.fulfilled.match(resultAction)) {
                    alert("Registration Successful! Please Login.");
                    setIsLogin(true);
                    setFormData({ email: '', password: '', username: '' });
                } else {
                    alert("Registration Failed: " + resultAction.payload);
                }
            } else {
                const resultAction = await dispatch(login({
                    email: formData.email,
                    password: formData.password,
                }));
                if (login.fulfilled.match(resultAction)) {
                    navigate("/dashboard");
                } else {
                    alert("Login Failed: " + resultAction.payload);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleModeSwitch = () => {
        setIsLogin((prev) => !prev);
        setFormData({ email: '', password: '', username: '' });
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="landing-page">
            <h1>Welcome to Bookshelf</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                )}
                <input className="commonStyle1"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input className="commonStyle1"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button className="commonStyle1" type="submit" disabled={loading}>
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleModeSwitch}>
                {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
        </div>
    );
};

export default LandingPage;