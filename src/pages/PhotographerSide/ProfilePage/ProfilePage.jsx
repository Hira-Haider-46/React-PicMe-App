import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import idCardImg from '../../../assets/images/upload-id.png';
import Button from '../../../commonComponents/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPhotographerType, setSelectedPhotographerType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home-page');
  }

  return (
    <div className='profile-page'>
      <h2 className='h2'>Create Your Profile</h2>
      <p className='p'>Update your details in the form provided.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input type="text" placeholder='Full Name' />
        </div>
        <div className="input-field">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{ color: selectedGender ? 'black' : `{$var(--text)}` }}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <input type="text" placeholder='Address' />
        </div>
        <div className="input-field flex">
          <input type="text" placeholder='Add Custom Photographer Type' />
          <GoPlusCircle />
        </div>
        <div className="input-field">
          <select
            value={selectedPhotographerType}
            onChange={(e) => setSelectedPhotographerType(e.target.value)}
            style={{ color: selectedPhotographerType ? 'black' : `{$var(--text)}` }}
          >
            <option value="" disabled>Add Photographer Type</option>
            <option value="">No options available</option>
          </select>
        </div>
        <div className="file-upload">
          <label htmlFor="id-card-upload" className="upload-box flex">
            <img src={idCardImg} alt="Upload ID Card" />
            <p className='upload-text'>
              <span><FiUpload /></span>
              Upload ID Card
            </p>
            <p className='upload-text2'>
              Upload only in png, jpeg.
            </p>
          </label>
          <input id="id-card-upload" type="file" accept="image/png, image/jpeg" />
        </div>
        <Button text='SUBMIT' variant='fill' />
      </form>
    </div>
  );
}