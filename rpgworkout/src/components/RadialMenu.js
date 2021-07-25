import React, { Fragment } from 'react';

// import icons
import Battle from '../styles/images/fightIcon.png';






function RadialMenu(props){
    return (
        <section className = 'radialMenuContainer'>

            <div 
            className = 'radialItem' 
            id = 'battle' 
            onClick = { ()=>props.handleRadialClick('battle') }
            />

           

            
        </section>
    )
}





export default RadialMenu;