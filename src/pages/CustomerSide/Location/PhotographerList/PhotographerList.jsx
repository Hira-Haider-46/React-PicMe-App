import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { formatCategoryName } from "../../../../helper/helper";
import profileImg from '../../../../assets/images/ProfileImg.png';
import PhotographerListCard from "../../../../commonComponents/PhotographerListCard";
import "./PhotographerList.css";

export default function PhotographerList({
    location,
    photographers,
    searchType,
    category,
    setCategory,
    categories
}) {
    const [filteredPhotographers, setFilteredPhotographers] = useState(photographers);

    const handleIconClick = () => { };

    const handleSearchByCategory = (selectedCategory) => {
        setCategory(selectedCategory);

        if (selectedCategory) {
            const filtered = photographers.filter((photographerData) => {
                const { photographer } = photographerData;
                return photographer.categories.some(
                    (cat) => formatCategoryName(cat) === selectedCategory
                );
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
        <div className="list flex">
            {searchType === "location" && (
                <div className="loc-bar flex">
                    <IoIosArrowBack onClick={handleIconClick} />
                    <p>{location}</p>
                    <IoIosClose onClick={handleIconClick} />
                </div>
            )}

            <div className="text-part">
                <h2>Photographers Lists</h2>
                <p>Find the best photographers in your area for your next event!</p>
            </div>

            {searchType === "location" && (
                <div className="search-by-category flex">
                    <select
                        value={category}
                        onChange={(e) => handleSearchByCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories?.length > 0 ? (
                            categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))
                        ) : (
                            <option value="">No categories available</option>
                        )}
                    </select>
                </div>
            )}

            <div className="cards">
                {console.log(filteredPhotographers)}
                {filteredPhotographers?.map((photographerData) => {
                    console.log('photographerData', photographerData.total_reviews);
                    return (
                        <PhotographerListCard
                            key={nanoid()}
                            obj={{
                                id: photographerData.id,
                                profileImg: photographerData.avatar_url
                                    ? photographerData.avatar_url
                                    : photographerData.photographer?.profile_image_url
                                        ? photographerData.photographer.profile_image_url
                                        : profileImg,

                                name: photographerData.name
                                    ? photographerData.name
                                    : photographerData.photographer?.name,

                                rating: photographerData.average_rating !== ''
                                    ? photographerData.average_rating
                                    : Number(photographerData.photographer?.average_rating).toFixed(1),
                                NoOfreviews: photographerData.total_reviews !== ''
                                    ? photographerData.total_reviews
                                    : photographerData.photographer?.total_reviews,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
