import React from 'react'
import classes from './Input.module.css'

function Input({ placeholder, fontSize, type, onChange }) {
    return (
        <input
            onChange={e => onChange(e.target.value)}
            style={{ fontSize: fontSize }}
            type={type}
            placeholder={placeholder}
            className={classes.Input} />
    )
}

export default Input