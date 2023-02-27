import React, { useState } from 'react'
import { UilCameraPlus } from '@iconscout/react-unicons'
import ImageService from '../../../services/imageService'
import classes from './ImgUpload.module.css'


function ImgUpload() {

    const [userImg, setUserImg] = useState('')

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUserImg(reader.result);
            let payload = {
                type: 'img',
                data: reader.result
            }
            console.log(ImageService.setImage(payload))
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className={classes.ImageUploader}>
            {userImg
                ? <img className={classes.Image} src={userImg} alt="User" />
                : <div className={classes.FileUploadWrapper}>
                    <UilCameraPlus size="100" color="#fff" />
                    <input className={classes.FileUpload} type="file" onChange={handleImageUpload} />
                </div>
            }
        </div>
    )
}

export default ImgUpload