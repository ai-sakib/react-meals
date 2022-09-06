import React, { useContext } from 'react'

import CartIcon from '../../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../../store/cart-context'

const HeaderCartButton = props => {
    const cartContext = useContext(CartContext)
    console.log('HEADER', cartContext.items)
    const numberOfCartItems = cartContext.items.reduce((totalQty, item) => {
        return (totalQty += item.qty)
    }, 0)
    return (
        <button className={classes.button} onClick={props.onCartShow}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>My Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
