import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Style/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/auth/login', {
                email,
                password,
            });

            setMessage('Login successful!');
            localStorage.setItem('token', response.data.token);
            navigate('/Home');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
            // Clear the message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="glow">
            <div className="login-container" id="glow">
                <h2>Login</h2>
                <form className="auth-form" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="check">
                        <input type="checkbox" id="login-check" />
                        <label htmlFor="login-check"> Remember Me</label>
                    </div>

                    <label className="lab">Don't have an account?</label>
                    <Link to="/register" className="register-link">
                        <button className="btn" id="main" type="button">Register</button>
                    </Link>

                    <div className="quick-btn-group">
                        <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="btn">
                                <i className="uim uim-google"></i>
                                <span>Login with Google</span>
                            </button>
                        </a>
                        <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="btn">
                                <i className="uim uim-apple"></i>
                                <span>Login with Apple</span>
                            </button>
                        </a>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
