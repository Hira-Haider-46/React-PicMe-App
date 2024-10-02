import React, { useEffect, useState } from 'react';
import PhotographerListCard from '../../../commonComponents/PhotographerListCard';
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { nanoid } from 'nanoid';
import { formatCategoryName } from '../../../helper/helper';
import './PhotographerList.css';

export default function PhotographerList({ location, photographers, setIsSearched, searchType, category, setCategory, categories }) {

    const [filteredPhotographers, setFilteredPhotographers] = useState(photographers);
    const [noDataFound, setNoDataFound] = useState();

    const handleIconClick = () => {
        setIsSearched(false);
    };

    const handleSearchByCategory = (selectedCategory) => {
        setCategory(selectedCategory);

        if (selectedCategory) {
            const filtered = photographers.filter(photographerData => {
                const { photographer } = photographerData;
                return photographer.categories.some(cat => formatCategoryName(cat) === selectedCategory);
            });
            setFilteredPhotographers(filtered);
        } else {
            setFilteredPhotographers(photographers);
        }
    };

    useEffect(() => {
        setFilteredPhotographers(photographers);
    }, [photographers]);

    return (
        <div className='list flex'>
            {searchType === 'location' && (
                <div className='loc-bar flex'>
                    <IoIosArrowBack onClick={handleIconClick} />
                    <p>{location}</p>
                    <IoIosClose onClick={handleIconClick} />
                </div>
            )}

            {noDataFound && (
                <div className='text-part'>
                    <h2>Photographers Lists</h2>
                    <p>Find the best photographers in your area for your next event!</p>
                </div>
            )}

            {searchType === 'location' && (
                <div className="search-by-category flex">
                    <select
                        value={category}
                        onChange={(e) => handleSearchByCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories?.length > 0 ? (
                            categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        ) : (
                            <option value="">No categories available</option>
                        )}
                    </select>
                </div>
            )}

            <div className='cards'>
                {searchType === 'location' && (
                    <>
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
                    </>
                )}
                {(searchType === 'category' || searchType === 'name') && (
                    <>
                        {filteredPhotographers.data.length > 0 ?
                            <>
                                {filteredPhotographers.data.map((photographerData) => {
                                    return (
                                        <PhotographerListCard
                                            key={nanoid()}
                                            obj={{
                                                profileImg: photographerData.profile_image_url,
                                                name: photographerData.name,
                                                rating: photographerData.average_rating.toFixed(1),
                                                NoOfreviews: photographerData.total_reviews
                                            }}
                                        />
                                    );
                                })}
                            </> : <div className='msg'><h3>No data found</h3></div>
                        }
                    </>
                )}
            </div>
        </div>
    );
}