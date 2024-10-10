import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import { DEL_PACKAGE } from '../../../../apis/apiUrls';
import { deleteApiWithAuth } from '../../../../apis/index';
import edit from '../../../../assets/images/edit.png';
import { convertToBullets } from '../../../../helper/helper';
import './PackageCard.css';

export default function PackageCard({ pkg, refreshPackages }) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const packageId = pkg.id;

    const bulletPoints = convertToBullets(pkg.description);
    const shouldShowReadMore = bulletPoints.length > 5;

    const delPkg = async () => {
        setLoading(true);
        const res = await deleteApiWithAuth(`${DEL_PACKAGE}${packageId}`);
        if (res.success) {
            console.log("Successfully deleted package");
            await refreshPackages(); 
            setLoading(false);
        } else {
            console.error(res.data);
        }
    }

    return (
        <div className='create-pkg-card'>
            <div className='logos flex'>
                {!loadingEdit ? <img src={edit} alt="edit-logo" className='edit-logo' /> : <LuLoader2 className="loader" />}
                {!loading ? <MdDeleteOutline className='del-logo' onClick={delPkg} /> : <LuLoader2 className="loader" />}
            </div>
            <div className='listItems'>
                <h2>{pkg.name}</h2>
                <h3>${pkg.price}</h3>
                <ul>
                    <li>{pkg.delivery_days} days Package</li>
                    <div>
                        {bulletPoints.slice(0, expanded ? bulletPoints.length : 5).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                    {shouldShowReadMore && (
                        <span className="read-more" onClick={() => setExpanded(prev => !prev)}>
                            {expanded ? 'Show Less' : 'Read More'}
                        </span>
                    )}
                </ul>
            </div>
        </div>
    );
}