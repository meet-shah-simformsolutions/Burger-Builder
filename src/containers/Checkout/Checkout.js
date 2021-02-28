import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/index"
class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };
  // componentWillMount() {
  //   console.log("checkout mounted");
  //   const query = new URLSearchParams(this.props.location.search);
  //   const newIngredients = {};
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       this.setState({ totalPrice: param[1] });
  //     } else {
  //       console.log(param[0]);
  //       console.log(param[1]);
  //       newIngredients[param[0]] = +param[1];
  //     }
  //   }
  //   console.log(newIngredients);
  //   this.setState({ ingredients: newIngredients });
  //   console.log(this.state.ingredients);
  // }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            cancel={this.checkoutCancelledHandler}
            continue={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased:state.order.purchased
  };
};


export default connect(mapStateToProps,null)(Checkout);
