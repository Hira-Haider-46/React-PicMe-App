import React, { useState, useEffect } from 'react';
import Button from '../../commonComponents/Button';
import { Link } from 'react-router-dom';
import './Verification.css';

export default function Verification() {
    const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (value.match(/^[0-9]$/) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < code.length - 1) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleResend = () => {
        setTimer(30);
    };

    return (
        <div className='forgot-pass flex'>
            <h2>Verification</h2>
            <p>We’ve sent you the verification code on abc@gmail.com</p>
            <div className='code-inputs flex'>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type='text'
                        className='code-box'
                        maxLength='1'
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                    />
                ))}
            </div>
            <Link to='/new-password'>
                <Button text='CONTINUE' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </Link>
            <div className='timer'>
                {timer > 0 ? (
                    <span>Re-send code in <a>{`0:${timer < 10 ? `0${timer}` : timer}`}</a></span>
                ) : (
                    <a onClick={handleResend}>re-send</a>
                )}
            </div>
        </div>
    );
}