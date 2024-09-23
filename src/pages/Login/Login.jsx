import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import './Login.css';

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="login flex">
            <h2>Sign in</h2>
            <form className='flex'>
                <div className="input-group flex">
                    <FaRegEnvelope />
                    <input type="email" placeholder="abc@email.com" required />
                </div>
                <div className="input-group flex">
                    <IoLockClosedOutline />
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Your password"
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
                <Button text='SIGN IN' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </form>
            <div className="signup-option">
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </div>
        </div>
    )
}