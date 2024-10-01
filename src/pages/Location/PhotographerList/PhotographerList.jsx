import React, { useState } from 'react';
import PhotographerListCard from '../../../commonComponents/PhotographerListCard';
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { nanoid } from 'nanoid'; 
import './PhotographerList.css';

export default function PhotographerList({ location, photographers, setIsSearched }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPhotographers = photographers.filter((photographerData) => {
        const { photographer } = photographerData;
        return photographer.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleIconClick = () => {
        setIsSearched(false); 
    }

    return (
        <div className='list flex'>
            <div className='loc-bar flex'>
                <IoIosArrowBack onClick={handleIconClick} /> 
                <p>{location}</p>
                <IoIosClose onClick={handleIconClick} />
            </div>
            <div className='text-part'>
                <h2>Photographers Lists</h2>
                <p>Find the best photographers in your area for your next event!</p>
            </div>
            <div className='search-bar flex'>
            <IoSearchOutline />
                <input
                    type="text"
                    placeholder='Search photographers'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BsSliders />
            </div>
            <div className='cards'>
                {filteredPhotographers.map((photographerData) => {
                    const { photographer } = photographerData;

                    return (
                        <PhotographerListCard
                            key={nanoid()}
                            obj={{
                                profileImg: photographer.avatar_url,
                                name: photographer.name,
                                rating: photographer.average_rating.toFixed(1),
                                NoOfreviews: photographer.total_reviews
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}