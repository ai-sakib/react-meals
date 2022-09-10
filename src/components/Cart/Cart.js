import React, { useContext, useState } from 'react'

import classes from './Cart.module.css'
import Modal from './../UI/Modal/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const onRemoveItemHandler = id => {
        cartCtx.removeItem(id)
    }
    const onAddItemHandler = item => {
        cartCtx.addItem({ ...item, qty: 1 })
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    {...item}
                    onRemove={onRemoveItemHandler.bind(null, item.id)}
                    onAdd={onAddItemHandler.bind(null, item)}
                />
            ))}
        </ul>
    )

    const [isCheckout, setIsCheckout] = useState(false)
    const orderHandler = () => {
        setIsCheckout(true)
    }

    const modalActions = (
        <div className={classes.actions}>
            <button
                className={classes['button--alt']}
                onClick={props.onCloseCart}>
                Close
            </button>
            {hasItems && (
                <button onClick={orderHandler} className={classes.button}>
                    Order
                </button>
            )}
        </div>
    )

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const submitOrderHandler = async userData => {
        setIsSubmitting(true)
        await fetch(
            'https://react-http-bb9f8-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        )
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onCloseCart}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const loadingContent = <p>Submitting ...</p>
    const orderSentContent = (
        <React.Fragment>
            <p>Successfully sent the order !</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    )

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && loadingContent}
            {didSubmit && orderSentContent}
        </Modal>
    )
}

export default Cart
