import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import Button from '../../commonComponents/Button';
import { Link } from 'react-router-dom';
import { postApiWithoutAuth } from '../../apis/index'; 
import { FORGOT_PASS } from '../../apis/apiUrls';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const type = localStorage.getItem('type');

    const handleForgotPassword = async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await postApiWithoutAuth(FORGOT_PASS, {
            email: email,
            redirect_url: `http://localhost:5173/new-password?email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}`
        });
        if (res.success) {
            console.log("Password reset email sent successfully.");
        } else {
            console.error("Error sending password reset email: ", res);
        }
        setLoading(false);
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
                <Button text={loading ? <LuLoader2 className="loader" /> : 'CONTINUE'} variant='fill' />
            </form>
            <Link to='/login'>
                <Button text='BACK TO LOGIN' variant='empty' />
            </Link>
        </div>
    );
}