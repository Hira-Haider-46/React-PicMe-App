import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import illustration from '../../assets/images/illustration.png';
import './ChooseLocation.css';

export default function ChooseLocation() {
  return (
    <div className='flex choose-loc'>
      <img src={illustration} alt="illustration" />
      <h2>Search Location</h2>
      <p>Find the best photographers in your area for your next event!</p>
      <Link to='/location?searchType=category'>
        <Button text='SEARCH BY CATEGORY' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
      </Link>
      <Link to='/location?searchType=name'>
        <Button text='SEARCH BY NAME' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
      </Link>
      <Link to='/location?searchType=location'>
        <Button text='SEARCH BY LOCATION' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
      </Link>
    </div>
  );
}