import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import { postApiWithoutAuth } from '../../apis';
import { LOGIN } from '../../apis/apiUrls';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginSuccess } from '../../features/authSlice'; 
import './Login.css';

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const type = useSelector((state) => state.auth.type); 
    console.log(type);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        
        if (type === null) {
            console.error("type is not set");
            return;
        }

        const res = await postApiWithoutAuth(LOGIN, { email, password, type }); 
        if (res.success) {
            const token = res.headers.authorization;
            localStorage.setItem('token', token);
            dispatch(loginSuccess({ token, user: res.data.user, type })); 
            navigate('/');
        } else {
            console.error("Login error ", res);
        }
    };

    return (
        <div className="login flex">
            <h2>Log in</h2>
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
                <Button text='LOG IN' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </form>
            <div className="signup-option">
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </div>
        </div>
    );
}