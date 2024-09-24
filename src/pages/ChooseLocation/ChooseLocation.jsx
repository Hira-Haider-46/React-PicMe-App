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
      <Link to='/location'>
        <Button text='CHOOSE LOCATION' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
      </Link>
    </div>
  )
}