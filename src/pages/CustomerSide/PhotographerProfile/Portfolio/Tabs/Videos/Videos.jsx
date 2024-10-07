import React from 'react';
import VideoCard from './VideoCard';
import './Videos.css';

export default function Videos({ videos, selectedCategory }) {
  return (
    <div className='videos-container' style={videos.length === 0 ? { display: 'flex' } : { display: 'grid' }}>
      {selectedCategory &&
        <>
          {videos.length > 0 ? (
            videos.map((videoUrl, index) => (
              <VideoCard key={index} videoUrl={videoUrl} />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </>
      }
    </div>
  )
}