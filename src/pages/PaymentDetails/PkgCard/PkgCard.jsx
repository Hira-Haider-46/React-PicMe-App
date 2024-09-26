import React from 'react';
import Button from '../../../commonComponents/Button';
import './PkgCard.css';

export default function PkgCard({packageDetails}) {
    return (
        <div className='pkg-card package-card' style={{ backgroundColor: packageDetails.bgColor }}>
            <img src={packageDetails.logo} alt={packageDetails.name} />
            <h2>{packageDetails.name}</h2>
            <h3>${packageDetails.price}</h3>
            <ul>
                <li>{packageDetails.days} days Package</li>
                <li>Up to {packageDetails.photos} Photos</li>
                <li>Up to {packageDetails.video} Video</li>
            </ul>
            <Button text='SELECTED' styles={{ backgroundColor: 'white', color: packageDetails.bgColor, border: '1.5px solid white', fontWeight: 'bolder', fontSize: '0.9rem', cursor: 'auto' }} />
        </div>
    )
}