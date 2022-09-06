import React from 'react'

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input
                ref={ref}
                className='focus:outline-offset-0 focus:outline-none focus:border-cyan-400 focus:shadow focus:shadow-slate-300'
                {...props.input}
            />
        </div>
    )
})

export default Input
