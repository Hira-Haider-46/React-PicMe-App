import React from 'react';
import PhotographerListCard from '../../../commonComponents/PhotographerListCard';
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import ProfileImg from '../../../assets/images/ProfileImg.png';
import './PhotographerList.css';

export default function PhotographerList({ location }) {
    return (
        <div className='list flex'>
            <div className='loc-bar flex'>
                <IoIosArrowBack />
                <p>{location}</p>
                <IoIosClose />
            </div>
            <div className='text-part'>
                <h2>Photographers Lists</h2>
                <p>Find the best photographers in your area for your next event!</p>
            </div>
            <div className='search-bar flex'>
                <IoSearchOutline />
                <input type="text" placeholder='Search photographers' />
                <BsSliders />
            </div>
            <div className='cards'>
                <PhotographerListCard
                    obj={
                        {
                            profileImg: ProfileImg,
                            name: 'Joy Mark',
                            profeciency: 'Street Photographer',
                            rating: '4.0',
                            NoOfreviews: '123'
                        }
                    }
                />
            </div>
        </div>
    )
}