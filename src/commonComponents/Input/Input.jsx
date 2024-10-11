import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Input.css';

export default function Input({
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
    showPassword,
    toggleShowPassword,
    disabled,
}) {
    return (
        <div className='form-group'>
            <div className='input-group flex pass'>
                <input
                    type={showPassword && type === "password" ? "text" : type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className='form-input'
                    disabled={disabled}
                    aria-label={placeholder}
                />
                {type === "password" && (
                    <div onClick={toggleShowPassword} className='icon'>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                )}
            </div>
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
}