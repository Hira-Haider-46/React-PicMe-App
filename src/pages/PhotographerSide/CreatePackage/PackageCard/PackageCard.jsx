import React from 'react';
import edit from '../../../../assets/images/edit.png';
import './PackageCard.css';

export default function PackageCard() {
    return (
        <div className='create-pkg-card'>
            <img src={edit} alt="edit-logo" className='edit-logo' />
            <div className='list'>
                <h2>Premium</h2>
                <h3>$30</h3>
                <ul>
                    <li>6 days Package</li>
                    <li>Up to 40 Photos</li>
                    <li>Up to 6 Video</li>
                </ul>
            </div>
        </div>
    )
}