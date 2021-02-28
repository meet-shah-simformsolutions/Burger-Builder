import React, { Component } from "react";
import AuxComp from "../../hoc/AuxComp";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
    state = {
        showSideDrawer :false
    }
    sideDrawerClosedHandle = () =>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
  render() {
    return (
      <AuxComp>
        <Toolbar  
        isAuth={this.props.isAuthenticated}
        DrawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
        isAuth={this.props.isAuthenticated} 
        open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandle}/>
        <main className={classes.Content}>{this.props.children}</main>
      </AuxComp>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token != null
  }
}
export default connect(mapStateToProps,null)(Layout);
