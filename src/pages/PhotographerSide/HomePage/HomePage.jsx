import React, { useState } from 'react';
import Button from '../../../commonComponents/Button';
import portfolio from '../../../assets/images/portfolio.png';
import packageImg from '../../../assets/images/package.png';
import booking from '../../../assets/images/booking.png';
import tick from '../../../assets/images/tick.png';
import './HomePage.css';

export default function HomePage() {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (box) => {
        setSelectedBox(selectedBox === box ? null : box);
    };

    return (
        <div className='border home--page'>
            <h2>Tim’s Offering</h2>
            <p>Update Your Services Below.</p>
            <div className='boxes-container flex'>
                <div className='box box1' onClick={() => handleBoxClick('portfolio')}>
                    {selectedBox === 'portfolio' && <img src={tick} alt="tick-mark" className='tick-mark' />}
                    <div className='flex text-img-box'>
                        <img src={portfolio} alt="portfolio-img" className='box-img box1-img' />
                        <p>Portfolio</p>
                    </div>
                </div>
                <div className='box box2' onClick={() => handleBoxClick('package')}>
                    {selectedBox === 'package' && <img src={tick} alt="tick-mark" className='tick-mark' />}
                    <div className='flex text-img-box'>
                        <img src={packageImg} alt="packageImg-img" className='box-img' />
                        <p>Package</p>
                    </div>
                </div>
                <div className='box box3' onClick={() => handleBoxClick('booking')}>
                    {selectedBox === 'booking' && <img src={tick} alt="tick-mark" className='tick-mark' />}
                    <div className='flex text-img-box'>
                        <img src={booking} alt="booking-img" className='box-img' />
                        <p>Booking</p>
                    </div>
                </div>
            </div>
            <Button text='CONTINUE' variant='fill' />
        </div>
    );
}