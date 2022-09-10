import { useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.qty

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                qty: existingCartItem.qty + action.item.qty,
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        )
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItems = [...state.items]

        if (existingCartItem.qty === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                qty: existingCartItem.qty - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }

        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    )

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item })
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const clearItemsHandler = () => {
        dispatchCartAction({ type: 'CLEAR' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearItemsHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
