import { useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedItems = state.items.concat(action.item)
        const totalAmount =
            state.totalAmount + action.item.price * action.item.qty

        return {
            items: updatedItems,
            totalAmount: totalAmount,
        }
    }
    return defaultCartState
}
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    )

    const addItemHandler = item => {
        dispatchCartAction({ type: 'ADD_CART_ITEM', item: item })
    }
    const removeItemHandler = id => {
        dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id })
    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
