import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../commonComponents/Button';
import './PackageCard.css';

export default function PackageCard({ pkg }) {
    
    const [expanded, setExpanded] = useState(false);

    const convertToBullets = (input) => {
        const items = input.split('-').filter(item => item.trim() !== '');
        return items.map(item => `${item.trim()}`);
    };

    const bulletPoints = convertToBullets(pkg.description);
    const shouldShowReadMore = bulletPoints.length > 5;

    return (
        <div className='package-card'>
            <img src={pkg.logo} alt={pkg.name} />
            <h2>{pkg.name}</h2>
            <h3>${pkg.price}</h3>
            <ul>
                <li>{pkg.delivery_days} days Package</li>
                <div>
                    {bulletPoints.slice(0, expanded ? bulletPoints.length : 5).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                {shouldShowReadMore && (
                    <span className="read-more" onClick={() => setExpanded(prev => !prev)}>
                        {expanded ? 'Show Less' : 'Read More'}
                    </span>
                )}
            </ul>
            <Link to={`/checkout/${pkg.id}`}>
                <Button text='CONTINUE' variant='pkg' />
            </Link>
        </div>
    );
}