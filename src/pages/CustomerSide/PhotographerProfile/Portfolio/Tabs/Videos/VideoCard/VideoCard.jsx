import React, {useState} from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import './VideoCard.css';

export default function VideoCard({ videoUrl, path }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='video-card'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && path && (
                <MdOutlineDeleteOutline className="delete-icon"/>
            )}
            <video controls>
                <source src={videoUrl} />
            </video>
        </div>
    );
}