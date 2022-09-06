import React, { Fragment } from 'react'

import classes from './Header.module.css'
import mealsImage from '../../../assets/images/meals.jfif'
import HeaderCartButton from './HeaderCartButton'

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1 className='text-3xl font-bold'>React Meals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!' />
            </div>
        </Fragment>
    )
}

export default Header
