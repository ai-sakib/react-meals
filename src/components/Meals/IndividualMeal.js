import React from 'react'

const IndividualMeal = props => {
    const meal = props.item
    return <li className='text-sembold'>{meal.name}</li>
}

export default IndividualMeal
