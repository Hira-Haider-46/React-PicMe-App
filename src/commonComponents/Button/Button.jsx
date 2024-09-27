import React from 'react';
import './Button.css';

export default function Button({ text, styles, onClick, disabled }) {
    return (
        <button style={styles} onClick={onClick} disabled={disabled}>{text}</button>
    )
}