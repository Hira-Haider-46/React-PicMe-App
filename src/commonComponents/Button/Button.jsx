import React from 'react';
import './Button.css';

export default function Button({ text, styles }) {
    return (
        <button style={styles}>{text}</button>
    )
}