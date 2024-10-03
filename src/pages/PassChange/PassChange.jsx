import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import successMark from '../../assets/images/success.png';  
import './PassChange.css';

export default function PassChange() {
    const type = localStorage.getItem('type');  

    return (
        <div className='forgot-pass flex pass-change'>
            <img src={successMark} alt="successMark" />
            <h2>Password Changed!</h2>
            <p>Your password has been changed successfully.</p>
            <Link to={`/login?type=${encodeURIComponent(type)}`}> 
                <Button text='BACK TO LOGIN' variant='fill' />
            </Link>
        </div>
    );
}