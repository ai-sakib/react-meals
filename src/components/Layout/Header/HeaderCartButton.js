import React, { useContext, useEffect, useState } from 'react'

import CartIcon from '../../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../../store/cart-context'

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

    const cartContext = useContext(CartContext)
    const { items } = cartContext
    const numberOfCartItems = items.reduce((totalQty, item) => {
        return (totalQty += item.qty)
    }, 0)

    useEffect(() => {
        if (!items.length) return

        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [items])

    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`
    return (
        <button className={btnClasses} onClick={props.onCartShow}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>My Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
