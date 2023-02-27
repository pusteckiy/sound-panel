import React from 'react'
import Input from './UI/input/Input'
import Select from './UI/select/Select'
import Button from './UI/button/Button'
import FileUpload from './UI/fileUpload/FileUpload'
import classes from '../styles/LoadSound.module.css'

function LoadSound() {
    return (
        <div className={classes.LoadSound}>
            <h2>Load Sound</h2>
            <form action="">
                <Input fontSize={16} placeholder={"Title"} />
                <Input fontSize={16} placeholder={"Author"} />
                <Select
                    defaultValue={"Choose genre of sound"}
                    options={[
                        { value: 'rock', name: 'Рок' },
                        { value: 'pop', name: 'Поп' },
                        { value: 'phonk', name: 'Фонк' }
                    ]}
                />
                <div className={classes.ButtonWrapper}>
                    <FileUpload height="50px" />
                    <Button type="submit" marginTop="8%">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default LoadSound