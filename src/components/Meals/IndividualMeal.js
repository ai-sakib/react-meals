import React from 'react'

const IndividualMeal = props => {
    const meal = props.item
    return <li>{meal.name}</li>
}

export default IndividualMeal
