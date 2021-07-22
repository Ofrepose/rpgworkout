import React, { useState, useEffect } from 'react';

import '../styles/css/index.css';

function Damage(props){

    useEffect( () => {

    }, [])
   
return(
    <div className = 'damageContainer'>
        <p className = 'damageContent'>{`-${ props.damageAmount }`}</p>
    </div>
)    

}





export default Damage;
