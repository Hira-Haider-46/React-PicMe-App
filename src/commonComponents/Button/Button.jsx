import React from 'react';
import './Button.css';

export default function Button({ text, onClick, disabled, variant, bgColor }) {

    const variant1 = {
        backgroundColor: '#2BAFC7',
        color: 'white'
    };
    const variant2 = {
        backgroundColor: 'white',
        color: '#2BAFC7'
    };
    const variant3 = {
        backgroundColor: '#2BC7A5',
        color: 'white'
    };

    return (
        <button style={variant === 'pkg' ? variant3 : (variant === 'fill' ? variant1 : variant2)} onClick={onClick} disabled={disabled}>{text}</button>
    )
}