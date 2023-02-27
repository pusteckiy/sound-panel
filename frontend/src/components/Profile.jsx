import React, {useContext} from 'react';
import ImgUpload from './UI/ImgUpload/ImgUpload';
import classes from '../styles/Profile.module.css';
import { Context } from '..';


function Profile() {
    const { storage } = useContext(Context)

    return (
        <div className={classes.Profile}>
            <ImgUpload />
            <div className={classes.Information}>
                <h4>{storage.user.username}</h4>
                <p>Access: {storage.user.access}</p>
                <p>Sounds: {storage.user.sounds}</p>
            </div>
        </div>
    )
}

export default Profile