import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = (props) => {
    const { isAuthenticated } = props

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!isAuthenticated
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;