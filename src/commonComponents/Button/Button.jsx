import React from 'react';
import './Button.css';

export default function Button({ text, onClick, disabled, variant, styles }) {

    const variant1 = {
        backgroundColor: '#2BAFC7',
        color: 'white'
    };
    const variant2 = {
        backgroundColor: 'white',
        color: '#2BAFC7'
    };

    return (
        <button style={styles ? styles : (variant === 'fill' ? variant1 : variant2)} onClick={onClick} disabled={disabled}>{text}</button>
    )
}