import React, {useState} from 'react';
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import './CreateNewPass.css';

export default function CreateNewPass() {
    const [confirmPass, setConfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const toggleConfirmPass = () => {
        setConfirmPass(!confirmPass);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div className='forgot-pass flex new-pass'>
            <h2>Create New Password</h2>
            <p>Your new password must be different from previous used password.</p>
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
            <div className="input-group flex">
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
            <p className='pass-match'>Both Password Must Match.</p>
            <Link to='/password-change'>
                <Button text='UPDATE PASSWORD' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </Link>
        </div>
    )
}