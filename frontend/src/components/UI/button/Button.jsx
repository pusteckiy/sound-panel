import React from 'react'
import classes from './Button.module.css'

function Button({onClick, ...props}) {
  return (
    <button onClick={onClick} style={props} className={classes.Button}>
        {props.children}
    </button>
  )
}

export default Button