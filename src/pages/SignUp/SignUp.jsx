import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import './SignUp.css';

export default function SignUp() {
    const [confirmPass, setConfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const toggleConfirmPass = () => {
        setConfirmPass(!confirmPass);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form>
                <div className="input-group">
                    <FaRegEnvelope />
                    <input type="text" placeholder="Full name" required />
                </div>
                <div className="input-group">
                    <FaRegEnvelope />
                    <input type="email" placeholder="abc@email.com" required />
                </div>
                <div className="input-group">
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
                <div className="input-group">
                    <IoLockClosedOutline />
                    <input
                        type={confirmPass ? "text" : "password"}
                        placeholder="Confirm password"
                        required
                    />
                    <div onClick={toggleConfirmPass} style={{ cursor: 'pointer' }}>
                        {confirmPass ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <Button text='SIGN UP' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </form>
            <div className="signup-option">
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    )
}