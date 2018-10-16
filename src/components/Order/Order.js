import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];
    for (const key in props.ingredients) {
        if (props.ingredients.hasOwnProperty(key)) {
            const qty = props.ingredients[key];
            ingredients.push(`${key} (x${qty})`);
        }
    }

    const ingredientsOutput = ingredients.join(', ');

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;