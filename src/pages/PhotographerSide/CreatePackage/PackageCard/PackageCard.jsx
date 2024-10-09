import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import edit from '../../../../assets/images/edit.png';
import { convertToBullets } from '../../../../helper/helper';
import './PackageCard.css';

export default function PackageCard({ pkg }) {
    console.log(pkg)
    const [expanded, setExpanded] = useState(false);

    const bulletPoints = convertToBullets(pkg.description);
    const shouldShowReadMore = bulletPoints.length > 5;

    return (
        <div className='create-pkg-card'>
            <div className='logos flex'>
                <img src={edit} alt="edit-logo" className='edit-logo' />
                <MdDeleteOutline className='del-logo' />
            </div>
            <div className='list'>
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
            </div>
        </div>
    );
}