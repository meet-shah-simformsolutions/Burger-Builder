import axios from "../../axios-order";
import * as actionTypes from "./actionTypes"
export const addIngredient = (name) =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
};
export const removeIngredient = (name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    };
};
export const setIngredients = (ingredients) => {
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}
export const initIngredients = () =>{
    return dispatch => {
        axios.get(
        "https://my-burger-5a8b3-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
          dispatch(setIngredients(res.data))
      })
      .catch((err) => {
          dispatch(fetchIngredientsFailed())
      });
    }
}