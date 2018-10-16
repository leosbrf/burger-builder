import React from 'react';
import classes from './Logo.css';
/*webpack empacota, não colocar direto na tag html, 
*pois webpack não vai enxergar isso e não vai com a imagem
*/
import burgerLogo from '../../assets/images/burger-logo.png';


const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
}

export default logo;