import React from 'react';
import classes from "./Spinner.css"
function Spinner(props) {
    return (
        <div className={classes.Loader}>
            Loading.....
        </div>
    );
}

export default Spinner;