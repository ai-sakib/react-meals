import React, { useState } from 'react'
import Cart from './components/Cart/Cart'

import Header from './components/Layout/Header/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider'

function App() {
    const [isCartVisible, setCartIsVisible] = useState(false)
    const onShowCartHandler = () => {
        setCartIsVisible(true)
    }
    const onCloseCartHandler = () => {
        setCartIsVisible(false)
    }

    return (
        <CartProvider>
            {isCartVisible && <Cart onCloseCart={onCloseCartHandler} />}
            <Header onCartShow={onShowCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    )
}

export default App
