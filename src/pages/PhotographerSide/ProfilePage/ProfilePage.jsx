import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FiUpload } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import idCardImg from '../../../assets/images/upload-id.png';
import Button from '../../../commonComponents/Button';
import { getApiWithAuth, postApiWithAuth } from '../../../apis/index';
import { GLOBAL_CATEGORIES, ADD_CATEGORY, CREATE_PROFILE } from '../../../apis/apiUrls';
import { formatCategoryName } from '../../../helper/helper';
import './ProfilePage.css';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [photographerTypes, setPhotographerTypes] = useState([]);
  const [selectedPhotographerTypes, setSelectedPhotographerTypes] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customPhotographerType, setCustomPhotographerType] = useState('');
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await getApiWithAuth(`${GLOBAL_CATEGORIES}`);
    if (res.success) {
      const formattedPhotographerTypes = res.data.data.map(category => ({
        label: formatCategoryName(category),
        value: category,
      }));
      setPhotographerTypes(formattedPhotographerTypes);
    } else {
      console.error(res.data.message);
    }
  };

  const addType = async (type) => {
    const res = await postApiWithAuth(ADD_CATEGORY, { category: [type] });
    if (res.success) {
      console.log('Type added successfully');
      fetchCategories();
    } else {
      console.error(res.data);
    }
  };

  const handlePhotographerTypeChange = (selectedOptions) => {
    setSelectedPhotographerTypes(selectedOptions);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(file); 
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleCustomTypeAdd = () => {
    const exists = photographerTypes.some(type => type.value === customPhotographerType);
    if (!exists && customPhotographerType) {
      addType(customPhotographerType);
      setCustomPhotographerType('');
    } else {
      alert('Photographer type already exists or is empty!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !selectedGender || selectedPhotographerTypes.length === 0 || !uploadedImage) {
      alert('Please fill all required fields!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('gender', selectedGender);
    formData.append('category', JSON.stringify(selectedPhotographerTypes.map(option => option.value)));
    formData.append('document_pictures[]', uploadedImage);

    try {
      const res = await postApiWithAuth(CREATE_PROFILE, formData);
      if (res.success) {
        console.log('Profile created successfully');
        localStorage.setItem('name', name);
        navigate('/home-page');
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='profile-page'>
      <h2 className='h2'>Create Your Profile</h2>
      <p className='p'>Update your details in the form provided.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{ color: selectedGender ? 'black' : 'var(--text)' }}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="input-field flex">
          <input
            type="text"
            placeholder='Add Custom Photographer Type'
            value={customPhotographerType}
            onChange={(e) => setCustomPhotographerType(e.target.value)}
          />
          <GoPlusCircle onClick={handleCustomTypeAdd} style={{ cursor: 'pointer' }} />
        </div>
        <Select
          isMulti
          options={photographerTypes}
          value={selectedPhotographerTypes}
          onChange={handlePhotographerTypeChange}
          placeholder="Add Photographer Types"
          styles={{
            control: (provided) => ({
              ...provided,
              color: selectedPhotographerTypes.length > 0 ? 'black' : 'gray',
            }),
          }}
          required
        />
        <div className="file-upload">
          {uploadedImage ? (
            <div className="uploaded-image">
              <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
              <AiOutlineClose onClick={handleImageRemove} className="remove-icon" />
            </div>
          ) : (
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
          )}
          <input
            id="id-card-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            required
          />
        </div>
        <Button text='SUBMIT' variant='fill' />
      </form>
    </div>
  );
}