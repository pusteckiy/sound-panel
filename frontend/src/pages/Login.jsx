import { observer } from 'mobx-react-lite'
import React from 'react'
import LoginPanel from '../components/LoginPanel'

function Login() {
    return (
        <LoginPanel/>
    )
}

export default observer(Login);