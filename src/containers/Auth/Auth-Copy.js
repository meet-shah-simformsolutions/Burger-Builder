import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Redirect } from "react-router-dom";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          isNumeric: true

        },
        valid: false,
        touched: false,
      },
    },
    isSignup:true
  };
  checkValidity(value, rules) {

    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.validation.minLength) {
      isValid = value.length >= rules.validation.minLength && isValid;

    }

    if (rules.validation.maxLength) {
      isValid = value.length <= rules.validation.maxLength && isValid;

    }

    if (rules.validation.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.validation.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectpath !== '/'){
      this.props.onSetAuthRedirectPath()
    }
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName]
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (event) =>{
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
  }
  switchAuthModeHandler = () =>{
    this.setState(prevState =>{
      return{
        isSignup:!prevState.isSignup
      }
    })
  };
  
  render() {
    let formElementyArray = [];
    for (let key in this.state.controls) {
      formElementyArray.push({ id: key, config: this.state.controls[key] });
    }
    let form = formElementyArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        inValid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ));
    if(this.props.loading){
      form = <Spinner/>
    }
    let errorMsg = null
    if(this.props.error){
      errorMsg= (
        <p>
          {this.props.error.message}
        </p>
      )
    }
    let authRedirect = null
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h3 style={{color:"red"}}>{errorMsg}</h3>
        <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>

        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthenticated:state.auth.token != null,
    buildingBurger:state.burgerBuilder.building,
    authRedirectpath:state.auth.authRedirectPath,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onAuth: (email,password, isSignup)=> dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
