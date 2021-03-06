import React from "react";
import classes from "./Order.css";
function Order(props) {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  const ingredientsOutput = ingredients.map((ig) => {
    return (
      <span
        className={classes.Ordered_Ing}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientsOutput}</p>
      <p>
        Price:<strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
