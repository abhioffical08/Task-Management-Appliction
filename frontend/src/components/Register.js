import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false); // State for terms acceptance
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [termsError, setTermsError] = useState(''); // State for terms error message
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8; // Example: Password should be at least 8 characters
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setTermsError(''); // Reset terms error message

        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!acceptTerms) {
            setTermsError('You must accept the Terms & Conditions');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/auth/register', {
                username,
                email,
                password
            });
            setSuccess(response.data.message);
            navigate('/login');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAcceptTerms(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username :</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Password :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className='check'>
                    <input
                        type="checkbox"
                        id="terms-check"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="terms-check">Accept Terms & Conditions</label>
                </div>
                {termsError && <p style={{ color: 'red' }}>{termsError}</p>} {/* Terms error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button
                    className='btn'
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <div className='lab1'>
                    <label>Already have an account?</label>
                    <Link to="/login" className="register-link">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
