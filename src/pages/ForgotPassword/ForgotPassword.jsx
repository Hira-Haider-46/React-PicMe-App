import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import Button from '../../commonComponents/Button';
import { Link, useNavigate } from 'react-router-dom';
import { postApiWithoutAuth } from '../../apis'; 
import { FORGOT_PASS } from '../../apis/apiUrls'; 
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();  
        
        const res = await postApiWithoutAuth(FORGOT_PASS, { email: email, redirect_url: 'http://localhost:5173/new-password' });
        
        if (res.success) {
            console.log("Password reset email sent successfully.");
            navigate('/verification'); 
        } else {
            console.error("Error sending password reset email: ", res);
        }
    };    

    return (
        <div className='login forgot-pass'>
            <h2>Forgot Password?</h2>
            <p>Please enter your email address to request a password reset</p>
            <form onSubmit={handleForgotPassword} className="flex">
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
                <Button text='CONTINUE' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </form>
            <Link to='/login'>
                <Button text='BACK TO LOGIN' styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1px solid #2BAFC7' }} />
            </Link>
        </div>
    );
}