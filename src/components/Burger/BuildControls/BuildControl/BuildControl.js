import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    const { label, disable, removed, added } = props;
    
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button className={classes.Less} onClick={removed} disabled={disable}>Less</button>
            <button classes={classes.More} onClick={added}>More</button>
        </div>
    );
}

export default buildControl;