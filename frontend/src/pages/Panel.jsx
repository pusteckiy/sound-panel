import React, { useContext } from 'react'
import SoundList from '../components/SoundList'
import Profile from '../components/Profile'
import LoadSound from '../components/LoadSound'
import { Context } from '..'
import { redirect } from 'react-router-dom'

function Panel() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SoundList />
            <div>
                <Profile />
                <LoadSound />
            </div>
        </div>
    )
}

export default Panel