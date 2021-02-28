import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";
// import { purchaseBurger } from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    orderform: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      deliverymethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
    // loading: false,
  };
  
  inputChangedHandler = (event, inputIdentifier) => {
    
    const updatedFormElement = updateObject(this.state.orderform[inputIdentifier],{
      value:event.target.value,
      valid:checkValidity(
      event.target.value,
      this.state.orderform[inputIdentifier].validation
    ),
    touched:true
    })
    const updatedrOrderForm = updateObject(this.state.orderform,{
      [inputIdentifier]:updatedFormElement
    })
    let formIsValid = true;
    for (let inputIdentifier in updatedrOrderForm) {
      formIsValid = updatedrOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderform: updatedrOrderForm, formIsValid: formIsValid });
  };

  orderHandler = (e) => {
    e.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementidentifier in this.state.orderform) {
      formData[formElementidentifier] = this.state.orderform[
        formElementidentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formData,
      userId:this.props.userId
    };
    this.props.onOrderBurger(order,this.props.token);
    //alert("Order placed !")
    // axios
    //   .post("/order.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false });
    //   });
  };

  render() {
    let formElementyArray = [];
    for (let key in this.state.orderform) {
      formElementyArray.push({ id: key, config: this.state.orderform[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementyArray.map((formElement) => (
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
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          {" "}
          Order{" "}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData,axios));
