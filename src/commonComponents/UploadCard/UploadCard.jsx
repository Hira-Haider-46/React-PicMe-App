import React, { useRef, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { LuLoader2 } from "react-icons/lu";
import { UPLOAD_WORK } from '../../apis/apiUrls';
import { postApiWithAuth } from '../../apis/index';
import cloud from '../../assets/images/cloud.png';
import Button from '../Button';
import './UploadCard.css';

export default function UploadCard({ uploadRef, onClose, categories, photographerWork, onUploadSuccess }) {
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadWork = async () => {
        const workItem = photographerWork.find(item => item.work_type === selectedCategory);
        if (!workItem) {
            console.error('No work item found for the selected category');
            return;
        }

        const { title, description, work_type } = workItem;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('work_type', work_type);

        selectedFiles.forEach(file => {
            formData.append('photos[]', file);
        });

        setLoading(true);
        const res = await postApiWithAuth(UPLOAD_WORK, formData);
        if (res.success) {
            console.log('Successfully uploaded work');
            onUploadSuccess();
            onClose();
        } else {
            console.error(res.data.message);
        }
        setLoading(false);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        console.log(files);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className='upload-pictures-div' ref={uploadRef}>
            <h2 className='h2'>Select Your Photos</h2>
            <p className='p'>Create your profile to showcase stunning photography and attract clients.</p>
            <select
                className='choose-category category1'
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value) }}
                required
            >
                <option value=''>Select category</option>
                {categories?.length > 0 ? (
                    categories.map((category, index) => (
                        <option key={index} value={category.value}>
                            {category.label}
                        </option>
                    ))
                ) : (
                    <option>No category available</option>
                )}
            </select>
            <div className="file-upload" style={{ margin: '0.5em 0' }}>
                {selectedFiles.length > 0 ? (
                    <div className="uploaded-images">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="uploaded-image">
                                <img src={URL.createObjectURL(file)} alt={`uploaded-${index}`} />
                                <AiOutlineClose
                                    onClick={() => handleRemoveFile(index)} 
                                    className="remove-icon"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <label htmlFor="photos-upload" className="upload-pics flex">
                        <img src={cloud} alt="cloud-img" />
                        <p className='pics-text'>
                            Drag & drop files or
                            <span> Browse</span>
                        </p>
                        <p>Supported formats: JPEG, PNG</p>
                    </label>
                )}
                <input
                    id="photos-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    style={{ display: 'none' }}
                    required
                />
            </div>
            <Button text={loading ? <LuLoader2 className="loader" /> : 'SUBMIT'} variant='fill' onClick={uploadWork} />
        </div>
    );
}