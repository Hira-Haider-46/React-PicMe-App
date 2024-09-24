import React from 'react';
import Button from '../../commonComponents/Button';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="text flex">
            <h1>Experience Photography In a new Dimension</h1>
            <Link to='login'>
                <Button text='CONTINUE AS CUSTOMER' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </Link>
            <Link to='login'>
                <Button text='CONTINUE AS PHOTOGRAPHER' styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1px solid #2BAFC7' }} />
            </Link>
        </div>
    )
}