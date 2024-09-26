import React from 'react';
import Button from '../../../commonComponents/Button';
import './PackageCard.css';

export default function PackageCard({ obj }) {
    return (
        <div className='package-card' style={{ backgroundColor: obj.bgColor }}>
            <img src={obj.logo} alt="basic" />
            <h2>{obj.name}</h2>
            <h3>${obj.price}</h3>
            <ul>
                <li>{obj.days} days Package</li>
                <li>Up to {obj.photos} Photos</li>
                <li>Up to {obj.video} Video</li>
            </ul>
            <Button text='CONTINUE' styles={{ backgroundColor: obj.bgColor, color: 'white', border: '1.5px solid white' }} />
        </div>
    )
}