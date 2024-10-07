import React from 'react';
import ReviewCard from './ReviewCard';
import img from '../../../../../../assets/images/reviewProfileImg.png';
import './Reviews.css';

export default function Reviews() {
    return (
        <div className='reviews-container'>
            <ReviewCard
                obj={
                    {
                        profileImg: img,
                        name: 'Rocks Velkeinjen',
                        date: '10 Feb',
                        text: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
                        noOfStars: 4
                    }
                }
            />
        </div>
    )
}