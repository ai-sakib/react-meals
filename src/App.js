import React, { Fragment, useState } from 'react'
import Cart from './components/Cart/Cart'

import Header from './components/Layout/Header/Header'
import Meals from './components/Meals/Meals'

function App() {
    const [isCartVisible, setCartIsVisible] = useState(false)
    const onShowCartHandler = () => {
        setCartIsVisible(true)
    }
    const onCloseCartHandler = () => {
        setCartIsVisible(false)
    }

    return (
        <Fragment>
            {isCartVisible && <Cart onCloseCart={onCloseCartHandler} />}
            <Header onCartShow={onShowCartHandler} />
            <main>
                <Meals />
            </main>
        </Fragment>
    )
}

export default App
