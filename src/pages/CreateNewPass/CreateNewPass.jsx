import React, { useState } from 'react';
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import { putApiWithoutAuth } from '../../apis'; 
import { NEW_PASS } from '../../apis/apiUrls'; 
import './CreateNewPass.css';

export default function CreateNewPass() {
    const [confirmPass, setConfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const type = localStorage.getItem('type');

    const toggleConfirmPass = () => {
        setConfirmPass(!confirmPass);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        const res = await putApiWithoutAuth(NEW_PASS, {  
            password: newPassword,
            password_confirmation: confirmPassword
        });
    
        if (res.success) {
            console.log("Password updated successfully.");
            navigate(`/password-change?type=${encodeURIComponent(type)}`);
        } else {
            console.error("Error updating password: ", res.data.errors);
        }
    };    

    return (
        <div className='forgot-pass flex new-pass'>
            <h2>Create New Password</h2>
            <p>Your new password must be different from the previously used password.</p>
            <form onSubmit={handleUpdatePassword}>
                <div className="input-group flex">
                    <IoLockClosedOutline />
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Your password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                <p className='pass-match'>Both Passwords Must Match.</p>
                <Button text='UPDATE PASSWORD' variant='fill' />
            </form>
        </div>
    );
}