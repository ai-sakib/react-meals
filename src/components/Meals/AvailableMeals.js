import React, { useEffect, useState } from 'react'
import Card from '../UI/Card'

import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import useHttp from './../../hooks/use-http'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const { error, sendRequest: fetchMeals } = useHttp()

    useEffect(() => {
        const transformedMeals = mealObj => {
            const loadedMeals = []
            for (const key in mealObj) {
                loadedMeals.push({
                    id: key,
                    name: mealObj[key].name,
                    description: mealObj[key].description,
                    price: mealObj[key].price,
                })
            }
            console.log(loadedMeals)
            console.log('ok')
            setMeals(loadedMeals.reverse())
        }

        fetchMeals(
            {
                url: 'https://react-http-bb9f8-default-rtdb.firebaseio.com/meals.json',
            },
            transformedMeals
        )
    }, [fetchMeals])

    const mealsList = meals.map(meal => <MealItem key={meal.id} {...meal} />)
    return (
        <section className={classes.meals}>
            <Card>
                {!error && <ul>{mealsList}</ul>}
                {error && <p>{error}</p>}
            </Card>
        </section>
    )
}

export default AvailableMeals
