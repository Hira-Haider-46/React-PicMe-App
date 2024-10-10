import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import { loginSignUpSuccess } from '../../store/slices/authSlice';
import { postApiWithoutAuth } from '../../apis/index';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP } from '../../apis/apiUrls';
import './SignUp.css';

export default function SignUp() {
    const [confirmPass, setConfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const type = localStorage.getItem('type');

    const toggleConfirmPass = () => {
        setConfirmPass(!confirmPass);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const res = await postApiWithoutAuth(SIGNUP, { email, password, name, type: type });
        if (res.success) {
            // const token = res.headers.authorization;
            // localStorage.setItem('token', token);
            // dispatch(loginSignUpSuccess({ token, user: res.data.data, type }));
            navigate(`/verification?email=${encodeURIComponent(email)}`);
        } else {
            console.error("Signup error ", res);
        }
    };

    return (
        <div className="signup flex">
            <h2>Sign Up</h2>
            <form className='flex' onSubmit={handleSignUp}>
                <div className="input-group flex">
                    <FaRegEnvelope />
                    <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />
                </div>
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
                <div className="input-group flex">
                    <IoLockClosedOutline />
                    <input
                        type={confirmPass ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div onClick={toggleConfirmPass} style={{ cursor: 'pointer' }}>
                        {confirmPass ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <Button text='SIGN UP' variant='fill' />
            </form>
            <div className="signup-option">
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    );
}