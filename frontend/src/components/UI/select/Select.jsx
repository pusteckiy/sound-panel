import React from 'react'
import classes from './Select.module.css'

function Select({ options, defaultValue, value }) {
    return (
        <select value={value} className={classes.Select}>
            <option defaultValue hidden value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>)}
        </select>
    )
}

export default Select