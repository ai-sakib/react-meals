import { useState, useRef } from 'react'

import Input from '../../UI/Input/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)

    const amountRef = useRef()

    const onSubmitHandler = event => {
        event.preventDefault()

        const eneteredAmount = amountRef.current.value
        const eneteredAmountNumber = +eneteredAmount
        if (
            eneteredAmount.trim().length === 0 ||
            eneteredAmountNumber < 1 ||
            eneteredAmountNumber > 5
        ) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(eneteredAmountNumber)
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
                label='Amount'
                ref={amountRef}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && 'Please enter valid amount (1-5)'}
        </form>
    )
}

export default MealItemForm
