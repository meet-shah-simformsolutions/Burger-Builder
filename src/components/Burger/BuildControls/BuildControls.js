import React from 'react';
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},

]
function BuildControls(props) {
    return (
      <div className={classes.BuidControls}>
          <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
          <BuildControl 
          label={ctrl.label} 
          key={ctrl.label} 
          added={()=>props.ingredientAdded(ctrl.type)}
          removed={()=>props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}/>
        ))}
        <button 
        onClick={props.ordered} 
        disabled={!props.purchaseable} 
        className={classes.OrderButton}
        >{props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}
        </button>
      </div>
    );
}

export default BuildControls;