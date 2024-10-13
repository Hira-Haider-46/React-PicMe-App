import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from '../../commonComponents/Button';
import { postApiWithoutAuth } from '../../apis/index';
import { LOGIN } from '../../apis/apiUrls';
import { loginSignUpSuccess } from '../../store/slices/authSlice';
import './Login.css';

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const type = localStorage.getItem('type');

    useEffect(() => {
        if (rememberMe) {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, [rememberMe]);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleLogIn = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!type) {
            console.error("Type is not set");
            return;
        }

        const res = await postApiWithoutAuth(LOGIN, { email, password, type });
        if (res.success) {
            const token = res.headers.authorization;
            localStorage.setItem('token', token);
            if (rememberMe) {
                localStorage.setItem('email', email);
            }
            dispatch(loginSignUpSuccess({ token, user: res.data.data, type }));
            console.log('user login', res.data.data);
            navigate('/choose-location');
        } else {
            setError(res.data.message || "Login error, please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="login flex">
            <h2>Log in</h2>
            {error && <p className="error-message" style={{ margin: '0.5em' }}>{error}</p>}
            <form className='flex' onSubmit={handleLogIn}>
                <div className="input-group flex">
                    <FaRegEnvelope />
                    <input
                        type="email"
                        placeholder="abc@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group flex">
                    <IoLockClosedOutline />
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div onClick={toggleShowPass} style={{ cursor: 'pointer' }}>
                        {showPass ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <div className="form-options flex">
                    <div className="remember-me flex">
                        <label className="toggle-switch">
                            <input type="checkbox" checked={rememberMe} onChange={toggleRememberMe} />
                            <span className="slider"></span>
                        </label>
                        <span>Remember Me</span>
                    </div>
                    <Link to='/forgot-password' className="forgot-password">Forgot Password?</Link>
                </div>
                <Button text={loading ? <LuLoader2 className="loader" /> : 'LOG IN'} variant='fill' />
            </form>
            <div className="signup-option">
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </div>
        </div>
    );
}