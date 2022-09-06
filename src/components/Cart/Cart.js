import classes from './Cart.module.css'
import Modal from './../UI/Modal/Modal'

const Cart = props => {
    const cartItems = (
        <ul className={classes['cart-items']}>
            {[{ id: 1, name: 'Sushi', qty: 3, price: 22.5 }].map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>50.00</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart
