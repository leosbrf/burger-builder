import React from 'react';
import classes from './Input.css';

const input = (props) => {
    const inputClasses = [classes.InputElement];

    let inputElement = null;
    let validationErrorMessage = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationErrorMessage = (
            <p className={classes.ValidationError}>
                Please enter a valid value!
            </p>
        );
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}>
                    {
                        props.elementConfig.options.map((option) => {
                            return (
                                <option key={option.value}
                                    value={option.value}>
                                    {option.displayValue}
                                </option>);
                        })
                    }

                </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
    }



    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationErrorMessage}
        </div>
    );
}

export default input;