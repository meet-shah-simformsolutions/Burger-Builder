import React from 'react';
import Logo from "../../../Logo/Logo"
import NavigationItems from "../NavigationItems"
import classes from "./SideDrawer.css"
import Backdrop from "../../../UI/Backdrop/Backdrop"
import AuxComp from "../../../../hoc/AuxComp"
function SideDrawer(props) {
    let attechedClasses = [classes.SideDrawer,classes.Close]
    if(props.open){
        attechedClasses = [classes.SideDrawer,classes.Open]
    } 
    return (
        <AuxComp>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attechedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo/>

            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </AuxComp>
    );
}

export default SideDrawer;