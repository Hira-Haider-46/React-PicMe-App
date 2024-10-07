import React, { useState } from 'react';
import logo from '../../../../assets/images/basic.png';
import Button from '../../../../commonComponents/Button';
import { convertToBullets } from '../../../../helper/helper';
import './PkgCard.css';

export default function PkgCard({ packageDetails }) {

    const [expanded, setExpanded] = useState(false);

    const bulletPoints = convertToBullets(packageDetails.description); 
    const shouldShowReadMore = bulletPoints.length > 1;

    return (
        <div className='pkg-card package-card'>
            <img src={logo} alt={packageDetails.name} />
            <h2>{packageDetails.name}</h2>
            <h3>${packageDetails.price}</h3>
            <ul>
                <li>{packageDetails.delivery_days} days Package</li>
                <div>
                    {bulletPoints.slice(0, expanded ? bulletPoints.length : 1).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                {shouldShowReadMore && (
                    <span className="read-more" onClick={() => setExpanded(prev => !prev)}>
                        {expanded ? 'Show Less' : 'Read More'}
                    </span>
                )}
            </ul>
            <Button text='SELECTED' variant='empty' />
        </div>
    );
}