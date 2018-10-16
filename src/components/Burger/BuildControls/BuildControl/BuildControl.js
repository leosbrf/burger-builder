import React from 'react';
import classes from 'components/Burger/BuildControls/BuildControl/BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disable}>Less</button>
            <button classes={classes.More} onClick={props.added}>More</button>
        </div>
    );
}

export default buildControl;