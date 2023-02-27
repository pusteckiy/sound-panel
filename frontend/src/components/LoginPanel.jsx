import React, { useContext, useState } from 'react'
import { Context } from '../index'
import Button from '../components/UI/button/Button'
import Wrapper from '../components/UI/wrapper/Wrapper'
import Input from '../components/UI/input/Input'

function LoginPanel() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {storage} = useContext(Context)

    return (
        <Wrapper>
            <div>Login Panel</div>
            <form action="">
                <Input onChange={setUsername} type="text" placeholder='Username' />
                <Input onChange={setPassword} type="password" placeholder='Password' />
                <Button onClick={(e) => {e.preventDefault(); storage.login(username, password)}}>Login</Button>
            </form>
        </Wrapper>
    )
}

export default LoginPanel