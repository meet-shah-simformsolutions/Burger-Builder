import React from "react";
import classes from "./Input.css";
function Input(props) {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement]
  if(props.inValid  && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid)
  }
    if (props.invalid && props.touched) {
    validationError =  <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
    }   
  switch (props.elementType) {
    case ("input"):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ("textarea"):
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
      case ("select"):
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
            {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default Input;
