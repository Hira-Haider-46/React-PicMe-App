import React from 'react';
import './Button.css';

export default function Button({ text, styles, onClick }) {
    return (
        <button style={styles} onClick={onClick}>{text}</button>
    )
}